import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("rustik_user");
    if (user) {
      const { token } = JSON.parse(user);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

// Products
export const getProducts = (params = {}) => api.get("/products", { params });
export const getProduct = (id: string) => api.get(`/products/${id}`);
export const getProductBySlug = (slug: string) => api.get(`/products/slug/${slug}`);
export const createProduct = (data: object) => api.post("/products", data);
export const updateProduct = (id: string, data: object) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);
export const addReview = (id: string, data: object) => api.post(`/products/${id}/reviews`, data);

// Categories
export const getCategories = () => api.get("/categories");
export const createCategory = (data: object) => api.post("/categories", data);
export const updateCategory = (id: string, data: object) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);

// Users / Auth
export const login = (data: object) => api.post("/users/login", data);
export const register = (data: object) => api.post("/users/register", data);
export const getProfile = () => api.get("/users/profile");
export const updateProfile = (data: object) => api.put("/users/profile", data);
export const getUsers = () => api.get("/users");
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

// Orders
export const createOrder = (data: object) => api.post("/orders", data);
export const getMyOrders = () => api.get("/orders/my");
export const getOrder = (id: string) => api.get(`/orders/${id}`);
export const getAllOrders = () => api.get("/orders");
export const updateOrderStatus = (id: string, status: string) => api.put(`/orders/${id}/status`, { status });

// Blogs
export const getBlogs = () => api.get("/blogs");
export const getBlog = (slug: string) => api.get(`/blogs/${slug}`);
