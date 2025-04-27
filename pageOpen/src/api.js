import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // adjust if your backend runs on a different port
});

// Automatically attach token to requests
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
