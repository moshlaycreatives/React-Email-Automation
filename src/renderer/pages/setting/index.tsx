import { useEffect, useState } from 'react';
import useInput from '../../hooks/input';
import useFetch from '../../hooks/useFetch';
import { settingsServices } from '../../services/settingsService';
import { toast } from 'react-toastify';
// import electron from 'electron';
// const ipc = electron.ipcRenderer;

interface InfoInterface {
  cpuCount: number;
  availableRAM: number;
}

const Setting = () => {
  // const settings = useFetch({})
  const { response, loading, error, setResponse } = useFetch({
    callback: () => settingsServices.getSettingsOfLoginUser(),
  });
  const settings = response?.data?.data;
  const [systemInfo, setSystemInfo] = useState<InfoInterface>({
    cpuCount: 0,
    availableRAM: 0,
  });
  const defaultInput = { MaxBroswersAllowed: '', GoLoginToken: '' };
  const rules = {
    MaxBroswersAllowed: (value: number) =>
      +value > systemInfo?.cpuCount
        ? `Availabel ram is ${systemInfo?.availableRAM}GB and availabel cpu cores is ${systemInfo?.cpuCount}, so the max browser between 1 and ${systemInfo?.cpuCount}`
        : false,
  };
  const { input, setInput, onChange, errors, setErrors } = useInput({
    defaultInput,
    rules,
  });

  const disabledSave =
    !input?.MaxBroswersAllowed ||
    !input?.GoLoginToken ||
    errors?.MaxBroswersAllowed;

  useEffect(() => {
    try {
      async function getSystemInfomation() {
        const info = await window.electron.ipcRenderer.getSystemInfo();
        setSystemInfo(info);
      }
      getSystemInfomation();
    } catch (error) {
      console.log(error);
    }
  }, [input]);

  useEffect(() => {
    debugger;
    setInput(settings);
  }, [settings?._id]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSave = async () => {
    try {
      debugger;
      const response = await settingsServices.add(input);
      setInput(response?.data?.data);
      toast('Setting Saved', { type: 'success' });
    } catch (error) {
      toast('Setting Failed', { type: 'error' });
    }
  };
  const handleUpdate = async () => {
    debugger;
    try {
      const response = await settingsServices.update(input?._id, input);
      // setInput(response?.data?.data);
      setErrors({});
      toast('Setting Updated', { type: 'success' });
    } catch (error) {
      toast('Setting Failed', { type: 'error' });
    }
  };

  const handleClear = async () => {
    try {
      debugger;
      await settingsServices.delete(input?._id);
      setInput(defaultInput);
      setErrors({});

      toast('Settings Deleted', { type: 'success' });
    } catch (error) {
      toast('Settings Delete Failed', { type: 'error' });
    }
  };
  return (
    <div className="text-white w-50">
      <div className="border border-light rounded p-4 ms-1">
        <div className="input-group d-flex align-items-center mb-2">
          {/* <div className="input-group mb-3 d-flex align-items-center flex-wrap"> */}
          <label className="mb-2 mb-md-0">Max Browser Automation:</label>
          <input
            style={{
              height: '18px',
              borderRadius: '10px',
            }}
            type="number"
            className="form-control ms-3"
            placeholder="10"
            name="MaxBroswersAllowed"
            value={input?.MaxBroswersAllowed}
            onChange={(e) => onChange(e)}
            aria-label="MaxBroswersAllowed"
            aria-describedby="MaxBroswersAllowed"
          />
          {errors?.MaxBroswersAllowed && (
            <span className="text-danger">{errors?.MaxBroswersAllowed}</span>
          )}
        </div>
        <div className="input-group d-flex align-items-center">
          {/* <div className="input-group mb-3 d-flex align-items-center flex-wrap"> */}
          <label className="mb-2 mb-md-0">Gologin Api Token:</label>
          <input
            style={{
              height: '16px',
              borderRadius: '10px',
            }}
            type="text"
            className="form-control ms-3"
            placeholder="TOKEN HERE"
            name="GoLoginToken"
            value={input?.GoLoginToken}
            onChange={(e) => onChange(e)}
            aria-label="GoLoginToken"
            aria-describedby="GoLoginToken"
          />
        </div>
      </div>
      <div className="pe-5 d-flex justify-content-center flex-wrap gap-2 mt-4">
        <button
          className="btn btn-success py-1 px-4 fs-5"
          onClick={!input?._id ? handleSave : handleUpdate}
          disabled={disabledSave}
        >
          {!input?._id ? 'Save' : 'Update'}
        </button>
        <button
          disabled={!input?._id}
          className="btn btn-danger py-1 px-4 fs-5"
          onClick={handleClear}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Setting;
