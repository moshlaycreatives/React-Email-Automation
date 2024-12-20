import { SpintaxItem } from '../interfaces/spintax';
import { axiosJson } from '../utils/http';

const endpoint = '/spintax';
const spintaxServices = {
  add: async (item: SpintaxItem) => {
    const response = await axiosJson.post(endpoint, item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get<SpintaxItem[]>(endpoint);
    return response;
  },
  getById: async (id: string) => {
    const response = await axiosJson.get<SpintaxItem>(`${endpoint}/${id}`);
    return response;
  },
  update: async (id: string, item: SpintaxItem) => {
    const response = await axiosJson.patch(`${endpoint}/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/${id}`);
    return response;
  },
};

export { spintaxServices };
