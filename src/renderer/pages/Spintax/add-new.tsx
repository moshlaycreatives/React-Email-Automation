import { toast } from 'react-toastify';
import useInput from '../../hooks/input';
import useLoading from '../../hooks/useLoading';
import { SpintaxItem } from '../../interfaces/spintax';
import { useEffect, useState } from 'react';
import { spintaxServices } from '../../services/spintaxService';
import { isArray } from '../../utils/utils';
import { axiosJson } from '../../utils/http';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const defaultValues = {
  Name: '',
  Description: '',
};
const rules = {};

const AddNewSpintax = () => {
  const { input, onChange, setInput, errors } = useInput({
    defaultValues,
    rules,
  });
  const { id = '' } = useParams();
  const [refetch, setRefetch] = useState(false);
  const spintaxById = useFetch({
    id,
    callback: () => spintaxServices.getById(id),
    refetch,
    setRefetch,
  });

  const { loading: saveLoading, setStatus } = useLoading();
  const inputValidation = input?.Name && input?.Description;
  const errorsExist = errors?.Name || errors?.Description;
  const disableSave = !inputValidation || errorsExist;
  const [val, setVal] = useState('');
  const [selectedVal, setSelectedVal] = useState('');
  console.log(spintaxById.error);

  const saveSpintax = async (item: SpintaxItem) => {
    try {
      setStatus(true);
      const response = await spintaxServices.add(item);
      debugger;
      setInput(response.data.data);

      // dispatch(addSpintaxSuccess(item));
      toast('Spintax created', { type: 'success' });
    } catch (error: any) {
      toast('Failed to created spintax', { type: 'error' });
    } finally {
      setStatus(false);
    }
  };

  useEffect(() => {
    debugger;
    if (!spintaxById.loading) {
      console.log(spintaxById.response);
      console.log(spintaxById.error);
      setInput(spintaxById?.response?.data?.data);
    }
  }, [spintaxById?.loading]);

  const addValue = async () => {
    try {
      debugger;
      const response = await axiosJson.post(`/spintax/${input?._id}`, {
        spintaxValue: val,
      });
      setInput(response?.data?.data);
      setVal('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVal = async (val: string) => {
    try {
      const response = await axiosJson.post(`/spintax/deleteValue/${input?._id}`, {
        spintaxValue: val,
      });
      setInput(response?.data?.data);
      setVal('');
      toast('Value Deleted', { type: 'success' });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div
      className="text-white"
      style={{
        height: '100vh',
        background:
          'linear-gradient(180deg, #250E42 0%, #3C1B64 25%, #532886 50%)',
      }}
    >
      <div className="container">
        <div className="ms-5 me-4">
          <h1 className="pt-4 pb-2">Spintax</h1>
          <div className="mb-3 row">
            <label htmlFor="Name" className="form-label col-2 fw-bold">
              Name
            </label>
            <input
              style={{
                width: '211px',
                height: '30px',
                borderRadius: '5px',
              }}
              type="text"
              className="form-control col-3"
              id="Name"
              name="Name"
              value={input?.Name}
              onChange={onChange}
              placeholder="Name Here"
            />
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="spintax-Description"
              className="form-label col-2 fw-bold"
            >
              Description
            </label>
            <textarea
              style={{
                width: '308px',
                height: '69px',
                borderRadius: '5px',
              }}
              className="form-control col-3"
              id="spintax-Description"
              placeholder="Description Here"
              name="Description"
              value={input?.Description}
              onChange={onChange}
            ></textarea>
          </div>
          <div className="row ms-1">
            <div className="col-5 d-flex justify-content-end">
              <button
                style={{
                  width: '111px',
                  height: '33px',
                  borderRadius: '5px',
                }}
                className="btn btn-success"
                disabled={disableSave}
                onClick={() => saveSpintax(input)}
              >
                Save
              </button>
            </div>
          </div>
          <div
            className="row align-items-center gap-2 mb-3"
            style={{
              marginTop: '100px',
            }}
          >
            <label htmlFor="spintax-value" className="form-label col-2 fw-bold">
              Spintax Value:
            </label>
            <div className="col-4">
              <input
                style={{
                  width: '211px',
                  height: '30px',
                  borderRadius: '5px',
                }}
                type="email"
                className="form-control"
                id="spintax-value"
                placeholder="Value here"
                name="value"
                value={val}
                onChange={(e: any) => setVal(e.target.value)}
                disabled={disableSave}
              />
            </div>
            <button
              onClick={addValue}
              style={{}}
              className="btn btn-success col-1"
            >
              Add
            </button>
            <button
              onClick={() => deleteVal(selectedVal)}
              className="btn btn-danger col-1"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="row">
          <table className="table table-bordered w-75 rounded overflow-hidden">
            <thead>
              <tr>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              {isArray(input?.Values) &&
                input?.Values.map((item: any, index: number) => (
                  <tr
                    className={selectedVal === item ? 'table-active' : ''}
                    key={index}
                    onClick={() => setSelectedVal(item)}
                  >
                    <td>{item}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddNewSpintax;
