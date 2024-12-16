import React, { useState } from 'react';
import Table from '../../components/tables';
import Richtext from '../../components/richtext';

const GmailAccountForm = ({ item, handleClose, handleSave }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      email: 'email@gamil.com',
      firstname: 'first name',
      lastname: 'last name',
      firstline: 'first line',
    },
    {
      id: 2,
      email: 'email@gamil.com',
      firstname: 'first name',
      lastname: 'last name',
      firstline: 'first line',
    },
    {
      id: 3,
      email: 'email@gamil.com',
      firstname: 'first name',
      lastname: 'last name',
      firstline: 'first line',
    },
  ]);
  return (
    <div className="" style={{ width: '500px' }}>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3>Campaign</h3>
      </div>
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
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
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
        <label htmlFor="description" className="form-label w-50 fw-bold ">
          Description
        </label>
        <textarea
          rows={3}
          className="form-control"
          id="descrption"
          placeholder="Please enter description"
        ></textarea>
      </div>
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
        <label htmlFor="subject" className="form-label w-50 fw-bold ">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          placeholder="Please enter subject"
        />
      </div>
      <div>
        <Richtext />
      </div>

      <div className="d-flex gap-2 align-items-center flex-row-reverse mb-2">
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GmailAccountForm;
