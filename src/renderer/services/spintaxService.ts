import { SpintaxItem } from '../interfaces/spintax';
import { axiosJson } from '../utils/http';

const endpoint = '/spintax';
const spintaxServices = {
  add: async (item: SpintaxItem) => {
    const response = await axiosJson.post(endpoint + '/save', item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get<SpintaxItem[]>(endpoint + '/get-all');
    return response;
  },
  getById: async (id: string) => {
    const response = await axiosJson.get<SpintaxItem>(`${endpoint}/get/${id}`);
    return response;
  },
  update: async (id: string, item: SpintaxItem) => {
    const response = await axiosJson.put(`${endpoint}/update/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/delete/${id}`);
    return response;
  },
};

export { spintaxServices };
