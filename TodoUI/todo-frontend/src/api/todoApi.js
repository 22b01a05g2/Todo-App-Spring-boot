import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Todo APIs
export const getTodos = (completed) => {
  if (completed === "all") return api.get("/todos");
  return api.get("/todos", { params: { completed: completed === "true" } });
};

export const createTodo = (data) => api.post("/todos", data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

// Auth APIs
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);