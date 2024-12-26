import { axiosJson } from '../utils/http';

// const local = 'http://localhost:3000/users';
const endpoint = '/user';
const userServices = {
  signup: async (item) => {
    const response = await axiosJson.post(`${endpoint}/signup`, item);
    return response;
  },
  getAll: async () => {
    const response = await axiosJson.get(endpoint);
    return response;
  },
  getUser: async () => {
    const response = await axiosJson.get(`${endpoint}/user`);
    return response;
  },
  login: async (item) => {
    const response = await axiosJson.post(`${endpoint}/login`, item);
    console.log(response, 'login');
    localStorage.setItem('auth-token', response?.data?.token);
    return response;
  },
  logout: async () => {
    const response = await axiosJson.post(`${endpoint}/logout`);
    localStorage.removeItem('auth-token');
    return response;
  },
};

export { userServices };
