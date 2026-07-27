// src/lib/axios.ts
"use client";

import axios from "axios";

// Use the full URL
const api = axios.create({
  baseURL: "https://backend.portalparaiso.com/api/v1",
  headers: {
    "Content-Type":"application/json",
  },
  timeout: 30000,
});

// Add logging to debug
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Full Request URL:", `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;