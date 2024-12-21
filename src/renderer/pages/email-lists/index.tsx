import { useState } from 'react';
import ReactModal from '../../components/modal';
import Table from '../../components/tables';
import Form from './form';
import useFetch from '../../hooks/useFetch';
import { emailListServices } from '../../services/emaillistService';
import { toast } from 'react-toastify';

const EmailLists = () => {
  const [refetch, setRefetch] = useState(false);
  const data = useFetch({
    callback: emailListServices.getAll,
    refetch,
    setRefetch,
  });
  const { response, loading, error } = data;
  const items = response?.data?.data;
  const [open, setOpen] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const selectedItem = Array.isArray(items)
    ? items.find((item) => item._id === selectedId)
    : {};
  const handleClose = () => setOpen('');
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';

  const handleSave = async (item) => {
    try {
      debugger;
      const response = await emailListServices.add(item);
      toast('EmailList Created', { type: 'success' });

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
      const response = await emailListServices.update(selectedId, item);
      toast('EmailList Updated', { type: 'success' });

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
      const response = await emailListServices.delete(selectedId);
      setSelectedId('');
      toast('EmailList Deleted', { type: 'success' });
      setRefetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return 'Something went wrong';
  if (loading) return 'Loading...';

  return (
    <div>
      <ReactModal
        modalIsOpen={modifyModal}
        title="Email List"
        closeModal={handleClose}
      >
        <Form
          item={selectedItem}
          handleClose={handleClose}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
        />
      </ReactModal>
      <ReactModal
        modalIsOpen={addNewModal}
        title="Email List"
        closeModal={handleClose}
      >
        <Form
          item={selectedItem}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </ReactModal>
      <div className="actions d-flex gap-2">
        <button
          className="flex-grow-1 flex-shrink-1 btn btn-success"
          onClick={() => setOpen('add-new')}
        >
          Add New
        </button>
        <button
          className="flex-grow-1 flex-shrink-1 btn btn-success"
          onClick={() => setOpen('modify')}
        >
          Modify
        </button>
        <button
          className="flex-grow-1 flex-shrink-1 btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <Table
        thead={['Name', 'Description']}
        items={items}
        selectedKey="_id"
        selectedValue={selectedId}
        onRowClick={(item) => setSelectedId(item._id)}
        classes={{
          table: 'table table-bordered w-100 rounded overflow-hidden mt-5',
        }}
      />
    </div>
  );
};

export default EmailLists;
