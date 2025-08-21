// src/utils/auth.js
// Utility to get access token from localStorage (or other storage)
export function getAccessToken() {
  try {
    const authState = JSON.parse(localStorage.getItem('authState'));
    return authState?.accessToken || null;
  } catch {
    return null;
  }
}
