import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function loginRequest(email, password) {
  return api.post("/users/login", { email, password });
}

export async function registerRequest(name, email, password) {
  return api.post("/users/register", { name, email, password });
}

export default api;
