import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { accountServices } from '../../services/accountsService';
import { isArray } from '../../utils/utils';
import Loading from '../../components/loading';

const AccountsForm = ({ item, handleClose }) => {
  const { response, loading, error } = useFetch({
    callback: accountServices.getAll,
  });

  const items = response?.data?.data;
  const [selectedIds, setAccountIds] = useState([]);

  const select = (item, e) => {
    const { checked } = e.target;
    if (checked) {
      setAccountIds([...selectedIds, item?._id]);
    } else {
      const result = selectedIds.filter((id) => id !== item._id);
      setAccountIds(result);
    }
  };
  const selectAll = () => {
    setAccountIds(items.map((item) => item._id));
  };
  const deSelectAll = () => {
    setAccountIds([]);
  };
  console.log(items);
  return (
    <div style={{ width: 300, height: 300, overflow: 'auto' }} className="">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Accounts</h1>
        <span onClick={handleClose}>X</span>
      </div>

      <div className="d-flex justify-content-end align-items-center gap-2 mb-2">
        <button className="btn btn-primary btn-sm" onClick={selectAll}>
          Select All
        </button>
        <button onClick={deSelectAll} className="btn btn-primary btn-sm">
          Deselect All
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        isArray(items) &&
        items.map((item) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="account"
              value={item?._id}
              checked={selectedIds.includes(item?._id)}
              onClick={(e) => select(item, e)}
              id={item._id}
            />
            <label className="form-check-label" htmlFor={item._id}>
              {item.Email}
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default AccountsForm;
