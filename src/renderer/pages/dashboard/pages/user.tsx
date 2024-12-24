import Error from '../../../components/error';
import Loading from '../../../components/loading';
import Table from '../../../components/tables';
import useFetch from '../../../hooks/useFetch';
import { userServices } from '../../../services/userService';

const User = () => {
  const { response, loading, error } = useFetch({
    callback: userServices.getAll,
  });
  const items = response?.data?.data;
  console.log(items);

  if (error) return <Error />;
  if (loading) return <Loading />;
  return (
    <div>
      <h3 className="mb-4" style={{ color: '' }}>
        User Management
      </h3>
      <div className='d-flex justify-content-end gap-2 mb-3'>
        <button className="btn btn-sm btn-primary">Add</button>
        <button className="btn btn-sm btn-primary">Update</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </div>
      <div className="h-100 overflow-auto">
        <Table
          thead={['_id', 'username', 'email', 'role']}
          classes={{
            table: 'table table-border table-light overflow-hidden rounded',
          }}
          items={items}
        />
      </div>
    </div>
  );
};

export default User;
