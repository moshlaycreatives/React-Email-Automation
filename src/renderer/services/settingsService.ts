import { axiosJson } from '../utils/http';

// const localEndpoint = 'http://localhost:3000/settings';
const endpoint = '/settings';
const settingsServices = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint, item);
    return response;
  },
  getSettingsOfLoginUser: async () => {
    const response = await axiosJson.get(endpoint);
    return response;
  },
  update: async (id: string, item) => {
    const response = await axiosJson.put(`${endpoint}/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/${id}`);
    return response;
  },
};

export { settingsServices };
