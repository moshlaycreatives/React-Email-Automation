import { useState } from 'react';
import ReactModal from '../../components/modal';
import Table from '../../components/tables';
import Form from './form';

const EmailLists = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 1,
      description: 'hellow',
    },
    {
      id: 2,
      name: 2,
      description: 'new text',
    },
  ]);
  const [open, setOpen] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const selectedItem = items.filter((item) => item.id === selectedId);
  const handleClose = () => setOpen('');
  const modifyModal = open === 'modify';
  const addNewModal = open === 'add-new';
  const handleSave = (item) => {
    console.log(item);
  };

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
        <button className="flex-grow-1 flex-shrink-1 btn btn-success" onClick={()=>setOpen("add-new")}>
          Add New
        </button>
        <button className="flex-grow-1 flex-shrink-1 btn btn-success" onClick={()=>setOpen("modify")}>
          Modify
        </button>
        <button className="flex-grow-1 flex-shrink-1 btn btn-danger">
          Delete
        </button>
      </div>

      <Table
        thead={['name', 'description']}
        items={items}
        selectedKey="id"
        selectedValue={selectedId}
        onRowClick={(item) => setSelectedId(item.id)}
        classes={{
          table: 'table table-bordered w-100 rounded overflow-hidden mt-5',
        }}
      />
    </div>
  );
};

export default EmailLists;
