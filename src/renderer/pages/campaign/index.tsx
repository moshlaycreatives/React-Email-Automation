import { useState } from 'react';
import Table from '../../components/tables';
import Form from './form';
import ReactModal from '../../components/modal';
import AccountsForm from './accountForm';

const Campaign = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Gmail 1',
      state: '1',
      description: 'des 1',
    },
    {
      id: '2',
      name: 'Gmail 2',
      state: '2',
      description: 'des 2',
    },
    {
      id: '3',
      name: 'Gmail 3',
      state: '3',
      description: 'des 3',
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.filter((item) => item.id === selectedId);
  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
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
          onClick={() => setOpen('add-new')}
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
        <button style={{ width: '33%' }} className="btn btn-danger">
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
          thead={['name', 'state', 'description']}
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
  );
};

export default Campaign;
