import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_BASE
});

export const fetchVendors = () => api.get('/vendors');
export const addVendor = (data) => api.post('/vendors', data);
export const updateActive = (id) => api.patch(`/vendors/${id}/active`);
