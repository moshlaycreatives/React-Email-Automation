import { useEffect, useRef, useState } from 'react';
import Table from '../../components/tables';
import Form from './form';
import ReactModal from '../../components/modal';
import AccountsForm from './accountForm';
import { CampaignContext } from './campaignContext';
import useInput from '../../hooks/input';
import useFetch from '../../hooks/useFetch';
import { campaingeService } from '../../services/campaignService';
import Loading from '../../components/loading';
import { isArray } from '../../utils/utils';
import { toast } from 'react-toastify';

const Campaign = () => {
  // debugger;
  const { response, loading, error } = useFetch({
    callback: campaingeService.getAll,
    refetch: true,
  });
  const items = response?.data?.data;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem =
    isArray(items) && items.filter((item) => item._id === selectedId);
  const { input, setInput, onChange } = useInput({});
  const [richText, setRichText] = useState('');
  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const sunRef = useRef(null);

  const handleClose = () => setOpen('');
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';
  const handleSave = async (item) => {
    try {
      console.log(item);
      item.Body = richText;
      await campaingeService.add(item);
      debugger;
      sunRef?.current?.editor?.destory();
      toast('Campaign Created');
    } catch (error) {
      console.log(error);
    } finally {
      setInput({});
      handleClose();
      setRichText('');
    }
  };

  const deleteCampaign = async () => {
    await campaingeService.delete(selectedId);
    toast('Campaign Deleted', { type: 'success' });
  };

  if (error) return 'Something went wrong.';
  if (loading) return <Loading />;

  return (
    <CampaignContext.Provider
      value={{
        input,
        setInput,
        onChange,
        setRichText,
        richText,
        sunRef,
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
            handleSave={handleSave}
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
            onClick={() => {
              setOpen('add-new');
              setInput({});
              setRichText('');
            }}
          >
            Add New Campaign
          </button>
          <button
            style={{ width: '33%' }}
            className="btn btn-success"
            onClick={() => handleOpen('modify')}
            key={open}
          >
            Modify
          </button>
          <button
            style={{ width: '33%' }}
            className="btn btn-danger"
            onClick={deleteCampaign}
          >
            Delete
          </button>
          <button
            style={{ width: '33%' }}
            className="btn btn-primary overflow-hidden position-relative"
          >
            <label htmlFor="start"></label>
            start
            {/* <input type="file" id="start" style={{width:"33%"}} className='position-absolute'/> */}
          </button>
          <button style={{ width: '33%' }} className="btn btn-primary">
            pause
          </button>
          <button style={{ width: '33%' }} className="btn btn-primary">
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
            selectedKey="id"
            selectedValue={selectedId}
            onRowClick={(item) => {
              setSelectedId(item.id);
            }}
          />
        </div>
      </div>
    </CampaignContext.Provider>
  );
};

export default Campaign;
