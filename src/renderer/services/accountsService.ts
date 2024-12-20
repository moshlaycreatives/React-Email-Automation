import { axiosJson } from '../utils/http';

const endpoint = '/emailAccounts';
const accountServices = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint, item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get(endpoint);
    return response;
  },
  getById: async (id: string) => {
    const response = await axiosJson.get(`${endpoint}/${id}`);
    return response;
  },
  update: async (id: string, item) => {
    const response = await axiosJson.patch(`${endpoint}/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/${id}`);
    return response;
  },
};

export { accountServices };
