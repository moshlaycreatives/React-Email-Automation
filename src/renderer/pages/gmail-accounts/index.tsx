import { useRef, useState } from 'react';
import Table from '../../components/tables';
import Modal from '../../components/modal';
import Form from './form';
import useFetch from '../../hooks/useFetch';
import { accountServices } from '../../services/accountsService';
import { csvToJson, isArray } from '../../utils/utils';
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';
import LoadingBtn from '../../components/loadingBtn';
import Loading from '../../components/loading';
import Error from '../../components/error';

const GmailAccounts = () => {
  const [refetch, setRefetch] = useState(false);

  const {
    response,
    loading: fetchLoading,
    error,
  } = useFetch({
    callback: accountServices.getAll,
    refetch,
    setRefetch,
  });
  const items = response?.data?.data;

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { loading, setStatus } = useLoading();

  const importRef = useRef(null);

  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const handleClose = () => setOpen('');

  const saveLoading = loading === 'save' ? true : false;
  const deleteLoading = loading === 'delete' ? true : false;
  const importLoading = loading === 'import' ? true : false;
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';

  const selectedItem = selectedId
    ? isArray(items) && items.find((item) => item?._id === selectedId)
    : {};

  const transformBool = (val) => {
    return val === true ? 1 : 0;
  };

  const handleSave = async (item) => {
    try {
      debugger;
      console.log(item);
      item.Enable = transformBool(item.Enable);
      item.Visible = transformBool(item.Visible);
      setStatus('save');
      const response = await accountServices.add({ docs: [item] });
      toast('Account Created', { type: 'success' });

      setRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setStatus(false);
    }
  };

  const handleUpdate = async (item) => {
    try {
      debugger;
      console.log(item);
      item.Enable = transformBool(item.Enable);
      item.Visible = transformBool(item.Visible);
      const response = await accountServices.update(selectedId, item);
      toast('Account Updated', { type: 'success' });

      setRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    try {
      debugger;
      setStatus('delete');
      const response = await accountServices.delete(selectedId);
      toast('Account Deleted', { type: 'success' });
      setRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      setStatus(false);
    }
  };

  const openFileModal = () => {
    importRef.current.click();
  };

  const importCsv = () => {
    const file = importRef.current.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      let result = e.target?.result;
      let json = csvToJson(result);
      await accountServices.import({ docs: json });
      setRefetch(true);
      result = null;
      json = null;
    };
    reader.readAsText(file);
    // csvToJson(file)
  };

  if (error) return <Error />;

  if (fetchLoading) return <Loading />;

  return (
    <div>
      <Modal
        modalIsOpen={modifyModal}
        title="Modify Account"
        closeModal={handleClose}
      >
        <Form
          item={selectedItem}
          handleClose={handleClose}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
        />
      </Modal>
      <Modal
        modalIsOpen={addNewModal}
        title="Add new Account"
        closeModal={handleClose}
      >
        <Form
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          handleSave={handleSave}
          saveLoading={saveLoading}
        />
      </Modal>
      <div className="actions w-100 d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div style={{ width: '32%' }} onClick={openFileModal}>
          <input onChange={importCsv} ref={importRef} type="file" hidden />
          <LoadingBtn
            loading={importLoading}
            className="btn btn-success w-100"
            label="Import Accounts"
          />
        </div>
        <button
          style={{ width: '32%' }}
          className="btn btn-success"
          onClick={() => setOpen('add-new')}
        >
          Add Account
        </button>
        <button
          style={{ width: '32%' }}
          className="btn btn-success"
          onClick={() => handleOpen('modify')}
          target={'modify'}
          // target={open}
          key={open}
        >
          Modify
        </button>
        <LoadingBtn
          style={{ width: '32%' }}
          className="btn btn-danger"
          onClick={handleDelete}
          loading={deleteLoading}
          label="Delete"
        />
        <button style={{ width: '32%' }} className="btn btn-primary">
          Open Account
        </button>
        <button style={{ width: '32%' }} className="btn btn-primary">
          Connect Account
        </button>
      </div>
      <div style={{ maxHeight: '50vh' }} className="overflow-auto">
        <Table
          thead={[
            '_id',
            'AccountName',
            'Email',
            'Proxy',
            'MaxEmailPerDay',
            'DelayInMinutes',
            'Enable',
            'Visible',
            'UserAgent',
          ]}
          items={items}
          classes={{
            table: 'table table-bordered rounded overflow-hidden',
            thead: 'thead-light',
            tbody: 'tbody-light',
          }}
          selectedKey="_id"
          selectedValue={selectedId}
          onRowClick={(item: any) => setSelectedId(item._id)}
        />
      </div>
    </div>
  );
};

export default GmailAccounts;
