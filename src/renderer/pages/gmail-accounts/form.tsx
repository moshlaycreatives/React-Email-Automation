import React from 'react';

const GmailAccountForm = ({ item,handleClose,handleSave }) => {
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
          placeholder=""
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="proxy" className="form-label w-50 fw-bold ">
          Proxy
        </label>
        <input type="text" className="form-control" id="proxy" placeholder="" />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row mb-2">
        <label htmlFor="user_agent" className="form-label w-50 fw-bold ">
          User Agent
        </label>
        <input
          type="text"
          className="form-control"
          id="user_agent"
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
          value=""
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
          value=""
          aria-label="Checkbox for following text input"
        />
      </div>
      <div className="d-flex gap-2 align-items-center flex-row-reverse mb-2">
        <button className="btn btn-danger" onClick={handleClose}>Close</button>
        <button className="btn btn-success" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default GmailAccountForm;
