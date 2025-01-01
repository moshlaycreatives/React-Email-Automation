import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { accountServices } from '../../services/accountsService';
import { isArray } from '../../utils/utils';
import Loading from '../../components/loading';
import { CampaignContext } from './campaignContext';

const AccountsForm = ({ item, handleClose }) => {
  const campaignContext = useContext(CampaignContext);
  const { onChange, input } = campaignContext;

  const { response, loading, error } = useFetch({
    callback: accountServices.getAll,
  });

  const items = response?.data?.data;
  const checked = (item) =>
    isArray(input?.CampaignOutgoingAccountIds)
      ? input?.CampaignOutgoingAccountIds.includes(item?._id)
      : false;

  const handleAccountIds = (ids) => {
    const event = { target: { name: 'CampaignOutgoingAccountIds', value: ids } };
    onChange(event);
  };

  const select = (item, e) => {
    debugger
    const { checked } = e.target;
    const CampaignOutgoingAccountIds = input?.CampaignOutgoingAccountIds || [];
    if (checked) {
      handleAccountIds([CampaignOutgoingAccountIds, item?._id]);
    } else {
      handleAccountIds(CampaignOutgoingAccountIds.filter((id) => id !== item._id));
    }
  };
  const selectAll = () => {
    debugger
    handleAccountIds(items.map((item) => item._id));
  };
  const deSelectAll = () => {
    handleAccountIds([]);
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
              checked={checked(item)}
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
