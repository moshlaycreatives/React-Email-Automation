import React, { useEffect } from 'react';
import useInput from '../../hooks/input';

const defaultValue = {};
const rules = {};
const GmailAccountForm = ({
  item,
  handleClose,
  handleSave,
  handleUpdate,
}: {
  item: any;
  handleClose: any;
  handleSave: any;
  handleUpdate: any;
}) => {
  const { input, setInput, onChange } = useInput({
    defaultValue,
    rules,
  });
  useEffect(() => {
    setInput(item);
  }, [item?._id]);

  return (
    <div className="" style={{ width: '500px' }}>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3>Gmail/G-Suit Account</h3>
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="name" className="form-label w-50 fw-bold ">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="AccountName"
          value={input?.['AccountName']}
          onChange={onChange}
          placeholder="Please enter name"
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="email" className="form-label w-50 fw-bold ">
          Gmail/G-Suit
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="Email"
          value={input?.['Email']}
          onChange={onChange}
          placeholder="Please enter email "
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="passsword" className="form-label w-50 fw-bold ">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="Password"
          value={input?.['Password']}
          onChange={onChange}
          placeholder="Please enter password"
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="max_daily_send" className="form-label w-50 fw-bold ">
          Max daily send
        </label>
        <input
          type="number"
          className="form-control"
          id="max_daily_send"
          name="MaxEmailPerDay"
          value={input?.['MaxEmailPerDay']}
          onChange={onChange}
          placeholder=""
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="Daily_in_minutes" className="form-label w-50 fw-bold ">
          Daily in minutes
        </label>
        <input
          type="number"
          className="form-control"
          id="daily_in_minutes"
          name="DelayInMinuts"
          value={input?.['DelayInMinuts']}
          onChange={onChange}
          placeholder=""
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="proxy" className="form-label w-50 fw-bold ">
          Proxy
        </label>
        <input
          type="text"
          className="form-control"
          id="proxy"
          placeholder=""
          name="Proxy"
          value={input?.['Proxy']}
          onChange={onChange}
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="user_agent" className="form-label w-50 fw-bold ">
          User Agent
        </label>
        <input
          type="text"
          className="form-control"
          id="user_agent"
          name="UserAgent"
          value={input?.['UserAgent']}
          onChange={onChange}
          placeholder=""
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="active" className="form-label fw-bold ">
          Active
        </label>
        <input
          id="active"
          className="form-check-input mt-0"
          type="checkbox"
          name="Enable"
          value={input?.['Enable']}
          checked={input?.['Enable']}
          onChange={(e) => onChange(e, e.target.checked, 'zero')}
          aria-label="Checkbox for following text input"
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="visible" className="form-label fw-bold ">
          visible
        </label>
        <input
          id="visible"
          className="form-check-input mt-0"
          type="checkbox"
          name="Visible"
          value={input?.['Visible']}
          checked={input?.['Visible']}
          onChange={(e) => onChange(e, e.target.checked, 'zero')}
          aria-label="Checkbox for following text input"
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row-reverse mb-2">
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
        <button
          className="btn btn-success"
          onClick={
            item?._id ? () => handleUpdate(input) : () => handleSave(input)
          }
        >
          {item?._id ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default GmailAccountForm;
