import { axiosJson } from '../utils/http';

const endpoint = '/campaign';

const campaingeService = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint, item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get(endpoint);
    return response;
  },
  start: async (id) => {
    const response = await axiosJson.get(`${endpoint}/start/${id}`);
    return response;
  },
  getById: async (id: string) => {
    const response = await axiosJson.get(`${endpoint}/${id}`);
    return response;
  },
  update: async (id: string, item) => {
    const response = await axiosJson.post(`${endpoint}/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/${id}`);
    return response;
  },
};

export { campaingeService };
