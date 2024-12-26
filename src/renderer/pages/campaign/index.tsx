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
import { spintaxServices } from '../../services/spintaxService';
import Error from '../../components/error';

const Campaign = () => {
  // debugger;
  const [refetch, setRefetch] = useState(false);
  const { response, loading, error } = useFetch({
    callback: campaingeService.getAll,
    refetch,
    setRefetch,
  });

  const {
    response: spintaxResponse,
    loading: spintaxLoading,
    error: spintaxError,
  } = useFetch({ callback: spintaxServices.getAll });
  const spintaxes = isArray(spintaxResponse?.data?.data)
    ? spintaxResponse?.data?.data
    : [];

  const items = response?.data?.data;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem =
    isArray(items) && items.find((item) => item._id === selectedId);
  const { input, setInput, onChange } = useInput({});
  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  console.log(selectedItem);
  const handleClose = () => setOpen('');
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';
  let firstTime = true;
  let value = 0;

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

  const startCampaign = async () => {
    try {
      await campaingeService.start(selectedId);
    } catch (error) {
      console.log(error);
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
        spintaxes,
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
            Add New Campaign
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
            onClick={startCampaign}
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
          >
            pause
          </button>
          <button
            disabled={!selectedId}
            style={{ width: '33%' }}
            className="btn btn-primary"
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
