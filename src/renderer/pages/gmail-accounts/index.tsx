import { useState } from 'react';
import Table from '../../components/tables';
import Modal from '../../components/modal';
import Form from './form';
import useFetch from '../../hooks/useFetch';
import { accountServices } from '../../services/accountsService';
import { isArray } from '../../utils/utils';
import { toast } from 'react-toastify';

const GmailAccounts = () => {
  const [refetch, setRefetch] = useState(false);
  const { response, loading, error } = useFetch({
    callback: accountServices.getAll,
    refetch,
    setRefetch,
  });
  const items = response?.data?.data;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = selectedId
    ? isArray(items) && items.find((item) => item?._id === selectedId)
    : {};
  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const handleClose = () => setOpen('');
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';
  const transformBool = (val) => {
    return val === true ? 1 : 0;
  };

  const handleSave = async (item) => {
    try {
      debugger;
      console.log(item);
      item.Enable = transformBool(item.Enable);
      item.Visible = transformBool(item.Visible);
      const response = await accountServices.add({ docs: [item] });
      toast("Account Created",{type:"success"})

      setRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  const handleUpdate = async (item) => {
    try {
      debugger;
      console.log(item);
      item.Enable = transformBool(item.Enable);
      item.Visible = transformBool(item.Visible);
      const response = await accountServices.update(selectedId, item);
      toast("Account Updated",{type:"success"})

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
      const response = await accountServices.delete(selectedId);
      toast("Account Deleted",{type:"success"})
      setRefetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return 'Something went wrong';
  if (loading) return 'Loading...';

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
        />
      </Modal>
      <div className="actions w-100 d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <button
          style={{ width: '32%' }}
          className="btn btn-success overflow-hidden position-relative"
        >
          <label htmlFor="import_accounts"></label>
          Import Accounts
          {/* <input type="file" id="import_accounts" style={{width:"33%"}} className='position-absolute'/> */}
        </button>
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
        {/* <Modal.Button
        
          className="btn btn-success"
          onClick={() => handleOpen('modify')}
          target={'modify'}
          // target={open}
          key={open}
        >
          Modify
        </Modal.Button> */}
        <button style={{ width: '32%' }} className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button style={{ width: '32%' }} className="btn btn-primary">
          Open Account
        </button>
        <button style={{ width: '32%' }} className="btn btn-primary">
          Connect Account
        </button>
      </div>
      <div style={{ height: '50vh' }} className="overflow-auto">
        <Table
          thead={[
            '_id',
            'AccountName',
            'Email',
            'Proxy',
            'MaxEmailPerDay',
            'DelayInMinuts',
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
