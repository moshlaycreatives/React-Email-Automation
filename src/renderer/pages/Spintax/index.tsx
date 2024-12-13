import { useState } from 'react';
import { SpintaxItem } from '../../interfaces/spintax';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/tables';

const Spintax = () => {
  const [items, setItems] = useState<SpintaxItem[]>([
    {
      id: '1',
      name: 'Hello 1',
      description: 'The sun, moon, and star are bright in the sky.',
    },
    {
      id: '2',
      name: 'Hello 2',
      description: 'The sun, moon, and star are bright in the sky.',
    },
    {
      id: '3',
      name: 'Hello 3',
      description: 'The sun, moon, and star are bright in the sky.',
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="w-25 btn btn-success"
          onClick={() => navigate('/spintax-addnew')}
        >
          Add new Spintax
        </button>
        <button className="w-25 btn btn-success">Modify</button>
        <button className="w-25 btn btn-danger">Cancel</button>
      </div>
      <div className="mt-5">
        <Table
          items={items}
          thead={['id', 'name', 'description']}
          classes={{
            table: 'table table-bordered rounded overflow-hidden',
          }}
        />
      </div>
    </div>
  );
};

export default Spintax;
