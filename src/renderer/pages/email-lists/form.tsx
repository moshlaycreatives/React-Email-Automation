import React, { useEffect, useRef, useState } from 'react';
import Table from '../../components/tables';
import useInput from '../../hooks/input';
import useFetch from '../../hooks/useFetch';
import { emailListServices } from '../../services/emaillistService';
import { csvToJson, isArray } from '../../utils/utils';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import Error from '../../components/error';

const GmailAccountForm = ({ item, handleClose, handleSave, handleUpdate }) => {
  const { input, setInput, onChange } = useInput({});
  const [refetch, setRefetch] = useState(false);
  const [emailId, setEmailId] = useState(null);

  const importRef = useRef(null);

  const { response, loading, error } = useFetch({
    callback: () => emailListServices.getAllEmails(item?._id),
    refetch,
    setRefetch,
  });

  const items = response?.data?.data;
  const disabled = item?._id ? false : true;

  useEffect(() => {
    setInput(item);
  }, [item?._id]);

  const openFileModal = () => {
    importRef?.current?.click();
  };

  const importCsv = () => {
    try {
      const file = importRef.current.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        let result = e.target?.result;
        let json = csvToJson(result);
        const data =
          Array.isArray(json) &&
          json?.map((email) => ({
            EmailListId: item?._id,
            ...email,
          }));
        await emailListServices.importEmails(data);
        toast('Imported', { type: 'success' });
        setRefetch(true);
        result = null;
        json = null;
      };
      reader.readAsText(file);
    } catch (error) {
      toast('Import Failed', { type: 'error' });
    }
    // csvToJson(file)
  };

  const deleteOne = async () => {
    try {
      toast('Saved Successfully', { type: 'success' });
      await emailListServices.deleteEmail(emailId);
      setRefetch(true);
    } catch (error) {
      toast('Delete Failed', { type: 'error' });
    }
  };

  const deleteAllEmails = async () => {
    try {
      await emailListServices.deleteAllEmail(item?._id);
      toast('Saved Successfully', { type: 'success' });
      setRefetch(true);
    } catch (error) {
      toast('Deleted Failed', { type: 'error' });
    }
  };

  if (error) return <Error />;
  if (loading) return <Loading />;

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
        <button
          className="btn btn-success"
          onClick={
            item?._id ? () => handleUpdate(input) : () => handleSave(input)
          }
        >
          {item?._id ? 'Update' : 'Save'}
        </button>
      </div>
      <div className="fw-bold w-100 gap-2 mb-2">
        Emails
        <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
          <button
            disabled={disabled}
            className="btn btn-success"
            style={{ width: '32%' }}
            onClick={openFileModal}
          >
            <input onChange={importCsv} ref={importRef} type="file" hidden />
            Import LIst
          </button>
          <button
            disabled={disabled}
            className="btn btn-danger"
            style={{ width: '32%' }}
            onClick={deleteOne}
          >
            Delete
          </button>
          <button
            disabled={disabled}
            className="btn btn-danger"
            style={{ width: '32%' }}
            onClick={deleteAllEmails}
          >
            Delete all
          </button>
        </div>
        <div
          style={{ height: '30vh', overflow: 'auto' }}
          className="w-100 my-4"
        >
          <Table
            thead={['Email', 'FirstName', 'LastName', 'FirstLine']}
            items={items}
            classes={{
              table: 'table table-bordered rounded overflow-hidden',
            }}
            selectedKey="_id"
            selectedValue={emailId}
            onRowClick={(item) => setEmailId(item?._id)}
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
