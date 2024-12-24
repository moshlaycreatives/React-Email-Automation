import { axiosJson } from '../utils/http';

const localEndpoint = 'http://localhost:3000/settings';
// const endpoint = '/settings';
const settingsServices = {
  add: async (item) => {
    const response = await axiosJson.post(localEndpoint, item);
    return response;
  },
  getSettingsOfLoginUser: async () => {
    const response = await axiosJson.get(localEndpoint);
    return response;
  },
  update: async (id: string, item) => {
    const response = await axiosJson.patch(`${localEndpoint}/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${localEndpoint}/${id}`);
    return response;
  },
};

export { settingsServices };
