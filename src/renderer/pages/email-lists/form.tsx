import React, { useEffect, useState } from 'react';
import Table from '../../components/tables';
import useInput from '../../hooks/input';

const GmailAccountForm = ({ item, handleClose, handleSave,handleUpdate }) => {
  const [items, setItems] = useState([]);
  const {input,setInput,onChange} = useInput({});

  useEffect(() => {
    setInput(item)
  }, [item?._id])
  
  return (
    <div className="" style={{ width: '500px' }}>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3>Email Lists</h3>
      </div>
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
        <label htmlFor="name" className="form-label w-50 fw-bold ">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="Name"
          value={input?.Name}
          onChange={onChange}
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
          name="Description"
          value={input?.Description}
          onChange={onChange}
          placeholder="Please enter description"
        ></textarea>
      </div>
      <div className="d-flex justify-content-end my-2">
        <button className="btn btn-success" onClick={item?._id ? ()=>handleUpdate(input) : () => handleSave(input)}>
          {item?._id ? "Update" : "Save"}
        </button>
      </div>
      <div className="fw-bold w-100 gap-2 mb-2">
        Emails
        <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
          <button className="btn btn-success" style={{ width: '32%' }}>
            Import LIst
          </button>
          <button className="btn btn-danger" style={{ width: '32%' }}>
            Delete
          </button>
          <button className="btn btn-danger" style={{ width: '32%' }}>
            Delete all
          </button>
        </div>
        <div className="h-25 w-100 overlfow-auto my-4">
          <Table
            thead={['email', 'firstname', 'lastname', 'firstline']}
            items={items}
            classes={{
              table: 'table table-bordered rounded overflow-hidden',
            }}
          />
        </div>
      </div>
      <div className="d-flex gap-2 align-items-center flex-row-reverse mb-2">
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GmailAccountForm;
