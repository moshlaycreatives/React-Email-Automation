import { useState } from 'react';
import Table from '../../components/tables';
import Modal from '../../components/modal';
import ModifyForm from './modify-form';

const GmailAccounts = () => {
  const [items, setItems] = useState([
    {
      profile_id: '1',
      name: 'Gmail 1',
      email: 'email1@gmail.com',
      proxy: '127.234.0.1',
      max_per_day: 20,
      delay_in_minutes: 10,
      active: 0,
      visible: 0,
      User_agents: '',
    },
    {
      profile_id: '2',
      name: 'Gmail 2',
      email: 'email2@gmail.com',
      proxy: '127.0.43.1',
      max_per_day: 20,
      delay_in_minutes: 10,
      active: 0,
      visible: 0,
      User_agents: '',
    },
    {
      profile_id: '3',
      name: 'Gmail 3',
      email: 'email3@gmail.com',
      proxy: '127.10.0.1',
      max_per_day: 20,
      delay_in_minutes: 10,
      active: 0,
      visible: 0,
      User_agents: '',
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.filter((item) => item.profile_id === selectedId);
  const [open, setOpen] = useState('');
  const handleOpen = (name: string) => setOpen(name);
  const handleClose = () => setOpen('');

  return (
    <div>
      <Modal open={open}>
        <ModifyForm />
      </Modal>
      <div className="actions d-flex gap-1 flex-wrap justify-content-between mb-4">
        <button
          style={{ width: '33%' }}
          className="btn btn-success overflow-hidden position-relative"
        >
          <label htmlFor="import_accounts"></label>
          Import Accounts
          {/* <input type="file" id="import_accounts" style={{width:"33%"}} className='position-absolute'/> */}
        </button>
        <button style={{ width: '33%' }} className="btn btn-success">
          Add Account
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
        {/* <Modal.Button
          style={{ width: '33%' }}
          className="btn btn-success"
          onClick={() => handleOpen('modify')}
          target={'modify'}
          // target={open}
          key={open}
        >
          Modify
        </Modal.Button> */}
        <button style={{ width: '33%' }} className="btn btn-danger">
          Delete
        </button>
        <button style={{ width: '33%' }} className="btn btn-primary">
          Open Account
        </button>
        <button style={{ width: '33%' }} className="btn btn-primary">
          Connect Account
        </button>
      </div>
      <div className="overflow-auto">
        <Table
          thead={[
            'profile_id',
            'name',
            'email',
            'proxy',
            'max_per_day',
            'delay_in_minutes',
            'active',
            'visible',
            'user_agents',
          ]}
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

export default GmailAccounts;
