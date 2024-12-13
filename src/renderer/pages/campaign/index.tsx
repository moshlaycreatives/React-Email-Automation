import { useState } from 'react';
import Table from '../../components/tables';

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
  return (
    <div>
      <div className="actions d-flex gap-1 flex-wrap justify-content-between mb-4">
        <button style={{ width: '33%' }} className="btn btn-success">
          Add New Campaign
        </button>
        <button
          style={{ width: '33%' }}
          className="btn btn-success"
          onClick={() => handleOpen('modify')}
          target={'modify'}
          // target={open}
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
          selectedKey="profile_id"
          selectedValue={selectedId}
          onRowClick={(item: any) => setSelectedId(item.profile_id)}
        />
      </div>
    </div>
  );
};

export default Campaign;
