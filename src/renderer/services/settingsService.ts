import { axiosJson } from '../utils/http';

// const localEndpoint = 'http://localhost:3000/settings';
const endpoint = '/settings';
const settingsServices = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint + '/save', item);
    return response;
  },
  getSettingsOfLoginUser: async () => {
    const response = await axiosJson.get(endpoint + '/get');
    return response;
  },
  update: async (id, item) => {
    const response = await axiosJson.put(`${endpoint}/update/` + id, item);
    return response;
  },
  delete: async (id) => {
    const response = await axiosJson.delete(`${endpoint}/delete/` + id);
    return response;
  },
};

export { settingsServices };
