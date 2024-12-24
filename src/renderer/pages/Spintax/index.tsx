import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/tables';
import useFetch from '../../hooks/useFetch';
import { spintaxServices } from '../../services/spintaxService';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import Error from '../../components/error';

const Spintax = () => {
  const [refetch, setRefetch] = useState(false);
  const { response, loading, error } = useFetch({
    callback: spintaxServices.getAll,
    refetch,
    setRefetch,
  });

  const navigate = useNavigate();
  const items = response?.data?.data;
  const deleteSpintax = async (id: string) => {
    try {
      const response = await spintaxServices.delete(id);
      if (response.status) {
        setRefetch(true);
        toast('Spintax Deleted', { type: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedId, setSelectedId] = useState<string | null>(null);
  console.log(error);

  if (error) return <Error />;

  if (loading) return <Loading />;

  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="w-25 btn btn-success"
          onClick={() => navigate('/spintax-addnew')}
        >
          Add new Spintax
        </button>
        <button
          className="w-25 btn btn-success"
          onClick={() => navigate(`/spintax-addnew/${selectedId}`)}
        >
          Modify
        </button>
        <button
          className="w-25 btn btn-danger"
          onClick={() => deleteSpintax(selectedId)}
        >
          Cancel
        </button>
      </div>
      <div className="mt-5">
        <Table
          items={items}
          thead={['_id', 'Name', 'Description']}
          classes={{
            table: 'table table-bordered rounded overflow-hidden',
          }}
          selectedValue={selectedId}
          selectedKey="_id"
          onRowClick={(item) => setSelectedId(item._id)}
        />
      </div>
    </div>
  );
};

export default Spintax;
