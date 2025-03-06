// client/src/services/dataService.js

import { getAccessToken } from './authService';

export async function fetchProtectedData() {
  try {
    const token = await getAccessToken();
    const response = await fetch('http://localhost:3000/protected', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch protected data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
