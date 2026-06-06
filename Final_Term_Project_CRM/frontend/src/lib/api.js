import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Set token from localStorage on init
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('crm_user');
  if (stored) {
    const user = JSON.parse(stored);
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  }
}

// ---- Auth ----
export const authAPI = {
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  me: () => axios.get(`${API_URL}/auth/me`),
};

// ---- Customers ----
export const customerAPI = {
  getAll: (params) => axios.get(`${API_URL}/customers`, { params }),
  getById: (id) => axios.get(`${API_URL}/customers/${id}`),
  create: (data) => axios.post(`${API_URL}/customers`, data),
  update: (id, data) => axios.put(`${API_URL}/customers/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/customers/${id}`),
  getStats: () => axios.get(`${API_URL}/customers/stats`),
};

// ---- Invoices ----
export const invoiceAPI = {
  getAll: () => axios.get(`${API_URL}/invoices`),
  getById: (id) => axios.get(`${API_URL}/invoices/${id}`),
  create: (data) => axios.post(`${API_URL}/invoices`, data),
  delete: (id) => axios.delete(`${API_URL}/invoices/${id}`),
};
