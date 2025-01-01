import { useEffect, useState } from 'react';
import Table from '../../components/tables';
import Form from './form';
import ReactModal from '../../components/modal';
import { CampaignContext } from './campaignContext';
import useInput from '../../hooks/input';
import useFetch from '../../hooks/useFetch';
import { campaingeService } from '../../services/campaignService';
import Loading from '../../components/loading';
import { isArray } from '../../utils/utils';
import { toast } from 'react-toastify';
import Error from '../../components/error';

const Campaign = () => {
  // debugger;
  const [refetch, setRefetch] = useState(false);
  const { response, loading, error } = useFetch({
    callback: campaingeService.getAll,
    refetch,
    setRefetch,
  });

  const items = response?.data?.data;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem =
    isArray(items) && items.find((item) => item._id === selectedId);
  const { input, setInput, onChange } = useInput({});
  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const handleClose = () => setOpen('');
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';

  useEffect(() => {
    setInput(selectedItem);
  }, [selectedId]);

  const addNew = () => {
    setInput({});
    setSelectedId('');
    setOpen('add-new');
  };

  const handleSave = async (item) => {
    try {
      await campaingeService.add(item);
      setRefetch(true);
      toast('Campaign Created', { type: 'success' });
    } catch (error) {
      console.log(error);
      toast('Campaign Failed', { type: 'error' });
    } finally {
      setInput({});
      handleClose();
    }
  };

  const handleUpdate = async (item) => {
    try {
      debugger;
      await campaingeService.update(selectedId, item);
      toast('Campaign Updated', { type: 'success' });
      setRefetch(true);
    } catch (error) {
      console.log(error);
      toast('Campaign Failed', { type: 'error' });
    } finally {
      setInput({});
      handleClose();
    }
  };

  const deleteCampaign = async () => {
    try {
      await campaingeService.delete(selectedId);
      toast('Campaign Deleted', { type: 'success' });
      setRefetch(true);

      toast('Campaign Deleted', { type: 'success' });
    } catch (error) {
      toast('Delete Failed', { type: 'error' });
    }
  };

  function htmlToText(html: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  }

  // const processCampaign = async (state) => {
  //   try {
  //     await campaingeService.process(selectedId, state);
  //   } catch (error) {
  //     toast('Campaign Failed', { type: 'error' });
  //   }
  // };

  const processCampaign = async (state) => {
    try {
      const response = await campaingeService.process(selectedId, state);
      const { emailBatches, campaign, accounts, settings } = response?.data;

      await Promise.all(
        accounts.map(async (account, accountIndex) => {
          const accountEmails = emailBatches[accountIndex];

          // if (accountEmails.length === 0) return;

          await window.electron.ipcRenderer.startSession({
            token: settings?.GoLoginToken,
            googleUsername: account?.Email,
            googlePassword: account?.Password,
            id: account?._id,
          });

          for (const email of accountEmails) {
            const personalizedBody = campaign.Body.replace(
              /{FirstName}/g,
              email.FirstName,
            );
            const plainTextBody = htmlToText(personalizedBody);

            await window.electron.ipcRenderer.sendEmail({
              recipientEmail: email?.Email,
              emailSubject: campaign?.Subject,
              emailBody: plainTextBody,
              id: account?._id,
            });

            await new Promise((resolve) =>
              setTimeout(resolve, account?.DelayInMinutes * 60 * 1000),
            );
          }
        }),
      );
      await Promise.all(
        accounts.map(async (account, accountIndex) => {
          await window.electron.ipcRenderer.closeSession({
            id: account?._id,
          });
        }),
      );
    } catch (error) {
      toast('Campaign Failed', { type: 'error' });
    }
  };

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <CampaignContext.Provider
      value={{
        input,
        setInput,
        onChange,
      }}
    >
      <div>
        <ReactModal
          modalIsOpen={modifyModal}
          title="campaign"
          closeModal={handleClose}
        >
          <Form
            item={selectedItem}
            handleClose={handleClose}
            handleUpdate={handleUpdate}
          />
        </ReactModal>
        <ReactModal
          modalIsOpen={addNewModal}
          title="campaign"
          closeModal={handleClose}
        >
          <Form
            item={selectedItem}
            handleClose={handleClose}
            handleSave={handleSave}
          />
        </ReactModal>
        <div className="actions d-flex gap-1 flex-wrap justify-content-between mb-4">
          <button
            style={{ width: '33%' }}
            className="btn btn-success"
            onClick={addNew}
          >
            Add New
          </button>
          <button
            style={{ width: '33%' }}
            className="btn btn-success"
            onClick={() => handleOpen('modify')}
            key={open}
            disabled={!selectedId}
          >
            Modify
          </button>
          <button
            style={{ width: '33%' }}
            className="btn btn-danger"
            onClick={deleteCampaign}
            disabled={!selectedId}
          >
            Delete
          </button>
          <button
            style={{ width: '33%' }}
            className="btn btn-primary overflow-hidden position-relative"
            onClick={() => processCampaign('Start')}
            disabled={!selectedId}
          >
            <label htmlFor="start"></label>
            start
            {/* <input type="file" id="start" style={{width:"33%"}} className='position-absolute'/> */}
          </button>
          <button
            disabled={!selectedId}
            style={{ width: '33%' }}
            className="btn btn-primary"
            onClick={() => processCampaign('Pause')}
          >
            pause
          </button>
          <button
            disabled={!selectedId}
            style={{ width: '33%' }}
            className="btn btn-primary"
            onClick={() => processCampaign('Stop')}
          >
            stop
          </button>
        </div>
        <div className="overflow-auto">
          <Table
            thead={['Name', 'State', 'Description']}
            items={items}
            classes={{
              table: 'table table-bordered rounded overflow-hidden',
              thead: 'thead-light',
              tbody: 'tbody-light',
            }}
            selectedKey="_id"
            selectedValue={selectedId}
            onRowClick={(item) => {
              setSelectedId(item?._id);
              console.log(item);
            }}
          />
        </div>
      </div>
    </CampaignContext.Provider>
  );
};

export default Campaign;
