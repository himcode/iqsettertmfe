// src/config/env.js
// Centralized environment config for API base URL

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export default {
  API_BASE_URL,
};
