// src/api/service.js
// Common API service using fetch
import env from '../config/env';
import { getAccessToken } from '../utils/auth';


export async function getUserTasks(options = {}) {
  const token = getAccessToken();
  const res = await fetch(`${env.API_BASE_URL}/tasks/gettasks`, {
    credentials: 'include',
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function apiPost(path, data, options = {}) {
  const token = getAccessToken();
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: 'include',
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function apiPut(path, data, options = {}) {
  const token = getAccessToken();
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: 'include',
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiDelete(path, options = {}) {
  const token = getAccessToken();
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
