import { axiosJson } from '../utils/http';

const endpoint = '/emailList';
const emailListEmails = '/emails';
const emailListServices = {
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
    const response = await axiosJson.post(`${endpoint}/${id}`, item);
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosJson.delete(`${endpoint}/${id}`);
    return response;
  },
  getAllEmails: async (id) => {
    const response = await axiosJson.get(`${emailListEmails}/${id}`);
    return response;
  },
  importEmails: async (items: any) => {
    const response = await axiosJson.post(emailListEmails, { docs: items });
    return response;
  },
  deleteEmail: async (id: string) => {
    const response = await axiosJson.delete(`${emailListEmails}/delete/${id}`);
    return response;
  },
  deleteAllEmail: async (id: string) => {
    const response = await axiosJson.delete(`${emailListEmails}/${id}`);
    return response;
  },
};

export { emailListServices };
