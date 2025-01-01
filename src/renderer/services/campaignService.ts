import { axiosJson } from '../utils/http';

const endpoint = '/campaign';

const campaingeService = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint + "/save", item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get(endpoint + "/get-all");
    return response;
  },
  process: async (id,state) => {
    const response = await axiosJson.post(`${endpoint}/process/${id}?state=${state}`);
    return response;
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
};

export { campaingeService };
