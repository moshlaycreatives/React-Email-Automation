import { axiosJson } from '../utils/http';

const endpoint = '/target-email-list-name';
const emailListEmails = '/target-email';
const emailListServices = {
  add: async (item) => {
    const response = await axiosJson.post(endpoint + '/add', item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get(endpoint + '/get-all');
    return response;
  },
  notSended: async (ids) => {
    return axiosJson.post(`${emailListEmails}/not-sended`, ids);
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
  getAllEmails: async (id) => {
    const response = await axiosJson.get(`${emailListEmails}/get-all/${id}`);
    return response;
  },
  importEmails: async (items: any) => {
    const response = await axiosJson.post(emailListEmails + '/add', {
      docs: items,
    });
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
