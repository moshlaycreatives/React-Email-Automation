import { axiosJson } from '../utils/http';

const local = 'http://localhost:3000/users/';
const accountServices = {
  signup: async (item) => {
    const response = await axiosJson.post(`${local}/signup`, item);
    return response;
  },
  login: async (item) => {
    const response = await axiosJson.post(`${local}/login`, item);
    console.log(response, 'login');
    localStorage.setItem('auth-token', response?.data?.token);
    return response;
  },
  logout: async () => {
    const response = await axiosJson.post(`${local}/logout`);
    localStorage.removeItem('auth-token');
    return response;
  },
};

export { accountServices };
