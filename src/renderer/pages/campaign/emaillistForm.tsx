import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { isArray } from '../../utils/utils';
import Loading from '../../components/loading';
import { emailListServices } from '../../services/emaillistService';
import { CampaignContext } from './campaignContext';

const EmailListForm = ({ item, handleClose }) => {
  const { input, onChange } = useContext(CampaignContext);

  const { response, loading, error } = useFetch({
    callback: emailListServices.getAll,
  });

  const items = response?.data?.data;
  const checked = (item) =>
    isArray(input?.CampaignTargetEmailIds)
      ? input?.CampaignTargetEmailIds.includes(item?._id)
      : false;

  const handleAccountIds = (ids) => {
    const event = { target: { name: 'CampaignTargetEmailIds', value: ids } };
    onChange(event);
  };

  const select = (item, e) => {
    const { checked } = e.target;
    const CampaignTargetEmailIds = input?.CampaignTargetEmailIds || [];
    if (checked) {
      handleAccountIds([CampaignTargetEmailIds, item?._id]);
    } else {
      handleAccountIds(CampaignTargetEmailIds.filter((id) => id !== item._id));
    }
  };
  const selectAll = () => {
    handleAccountIds(items.map((item) => item._id));
  };
  const deSelectAll = () => {
    handleAccountIds([]);
  };

  if (error) return <Error />;
  if (loading) return <Loading />;
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
              checked={checked(item)}
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
