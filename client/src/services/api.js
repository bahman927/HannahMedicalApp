// client/src/services/api.js
import authService from './authService';

export async function fetchWithAuth(url, options = {}) {
  const token = await authService.getAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  });
  if (response.status === 401) {
    throw new Error('Unauthorized');
  }
  return response.json();
}
