import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Form APIs
export const getAllForms = () => API.get("/forms");
export const getFormById = (id) => API.get(`/forms/${id}`);
export const createForm = (formData) => API.post("/forms", formData);
export const updateForm = (id, formData) => API.put(`/forms/${id}`, formData);
export const deleteForm = (id) => API.delete(`/forms/${id}`);
