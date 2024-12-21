import axios from 'axios';

// const baseUrl = 'http://192.168.1.10:8880/api/v1';
const baseUrl = 'https://63c4b8pc-8880.inc1.devtunnels.ms/api/v1';
const axiosJson = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
});

export { axiosJson, baseUrl };
