import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = Bearer ${token};
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth ---
export const signup = async (userData) => {
  try {
    const res = await API.post("/users/signup", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};

export const login = async (userData) => {
  try {
    const res = await API.post("/users/login", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// --- Users (Protected) ---
export const getUsers = async () => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch users" };
  }
};

// --- Products (Protected) ---
export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};
export const addProduct = async (product) => {
  const res = await API.post("/products", product);
  return res.data;
};
export const deleteProduct = async (id) => {
  const res = await API.delete(/products/${id});
  return res.data;
};

// --- Stock (Protected) ---
export const getStock = async () => {
  const res = await API.get("/stock");
  return res.data;
};
export const addStock = async (stock) => {
  const res = await API.post("/stock", stock);
  return res.data;
};