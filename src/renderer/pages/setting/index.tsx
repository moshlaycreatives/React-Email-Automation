import { useEffect, useState } from 'react';
import useInput from '../../hooks/input';
import useFetch from '../../hooks/useFetch';
import { settingsServices } from '../../services/settingsService';
import { toast } from 'react-toastify';
// import electron from 'electron';
// const ipc = electron.ipcRenderer;

const Setting = () => {
  // const settings = useFetch({})
  const { response, loading, error } = useFetch({
    callback: settingsServices.getSettingsOfLoginUser,
  });
  const settings = response?.data;
  const [systemInfo, setSystemInfo] = useState({});
  const defaultInput = { max_browser_automation: '', gologin_api_token: '' };
  const rules = {
    max_browser_automation: (value: number) =>
      +value > systemInfo?.cpuCount
        ? `Availabel ram is ${systemInfo?.availableRAM}GB and availabel cpu cores is ${systemInfo?.cpuCount}, so the max browser between 1 and ${systemInfo?.cpuCount}`
        : false,
  };
  const { input, setInput, onChange, errors, setErrors } = useInput({
    defaultInput,
    rules,
  });

  const disabledSave =
    !input?.max_browser_automation ||
    !input?.gologin_api_token ||
    errors?.max_browser_automation;

  useEffect(() => {
    async function getSystemInfomation() {
      const info = await window.electron.ipcRenderer.getSystemInfo();
      setSystemInfo(info);
    }
    getSystemInfomation();
  }, [input]);
  console.log(settings, 'settings');
  useEffect(() => {
    setInput(settings);
  }, [settings?._id]);

  const handleSave = async () => {
    try {
      await settingsServices.add(input);
      toast('Setting Saved', { type: 'success' });
    } catch (error) {
      toast('Setting Failed', { type: 'error' });
    }

    // generateWindows(input?.max_browser_automation);
    // debugger;
    // window.electron.ipcRenderer.sendMessage('create-window', [input]);
    // ipc.on('create-child-window', function (event, arg) {
    //   console.log(arg);
    // });
  };

  const handleClear = async () => {
    try {
      await settingsServices.delete(input?._id);
      setInput(defaultInput);
      setErrors({});

      toast('Settings Deleted', { type: 'success' });
    } catch (error) {
      toast('Settings Delete Failed', { type: 'success' });
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
            name="max_browser_automation"
            value={input?.max_browser_automation}
            onChange={(e) => onChange(e)}
            aria-label="max_browser_automation"
            aria-describedby="max_browser_automation"
          />
          {errors?.max_browser_automation && (
            <span className="text-danger">
              {errors?.max_browser_automation}
            </span>
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
            name="gologin_api_token"
            value={input?.gologin_api_token}
            onChange={(e) => onChange(e)}
            aria-label="gologin_api_token"
            aria-describedby="gologin_api_token"
          />
        </div>
      </div>
      <div className="pe-5 d-flex justify-content-center flex-wrap gap-2 mt-4">
        <button
          className="btn btn-success py-1 px-4 fs-5"
          onClick={handleSave}
          disabled={disabledSave}
        >
          Save
        </button>
        <button className="btn btn-danger py-1 px-4 fs-5" onClick={handleClear}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Setting;
