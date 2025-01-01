import { axiosJson } from '../utils/http';

const endpoint = '/outgoing';
const accountServices = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint + '/store-accounts', item);
    return response;
  },
  import: async (items) => {
    const response = await axiosJson.post(endpoint + '/store-accounts', items);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get(endpoint + '/get-all');
    return response;
  },
  getAllEnabled: async (ids) => {
    return axiosJson.post(`${endpoint}/active-accounts`);
  },
  getById: async (id: string) => {
    const response = await axiosJson.get(`${endpoint}/get/${id}`);
    return response;
  },
  update: async (id: string, item) => {
    const response = await axiosJson.put(`${endpoint}/update/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/delete/${id}`);
    return response;
  },
  connect: async (id: string) => {
    const response = await axiosJson.post(`/campaign/connect-account`, {
      id,
    });
    return response;
  },
};

export { accountServices };
