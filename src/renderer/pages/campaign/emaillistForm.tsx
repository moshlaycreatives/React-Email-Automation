import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { isArray } from '../../utils/utils';
import Loading from '../../components/loading';
import { emailListServices } from '../../services/emaillistService';

const EmailListForm = ({ item, handleClose }) => {
  const { response, loading, error } = useFetch({
    callback: emailListServices.getAll,
  });

  const items = response?.data?.data;
  const [selectedIds, setSelectedIds] = useState([]);

  const select = (item, e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedIds([...selectedIds, item?._id]);
    } else {
      const result = selectedIds.filter((id) => id !== item._id);
      setSelectedIds(result);
    }
  };
  const selectAll = () => {
    setSelectedIds(items.map((item) => item._id));
  };
  const deSelectAll = () => {
    setSelectedIds([]);
  };
  console.log(items);
  return (
    <div style={{ width: 300, height: 300, overflow: 'auto' }} className="">
      <div className="d-flex justify-content-between align-items-center">
        <h1>EmailList</h1>
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
              name="emaillist"
              value={item?._id}
              checked={selectedIds.includes(item?._id)}
              onClick={(e) => select(item, e)}
              id={item._id}
            />
            <label className="form-check-label" htmlFor={item._id}>
              {item.Name}
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default EmailListForm;
