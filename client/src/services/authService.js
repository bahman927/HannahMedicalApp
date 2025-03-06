// client/src/services/authService.js

let accessToken = null;
let refreshToken = null;

function loadTokens() {
  accessToken = localStorage.getItem('accessToken');
  refreshToken = localStorage.getItem('refreshToken');
}

function saveTokens(newAccessToken, newRefreshToken) {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('refreshToken', newRefreshToken);
}

async function refreshAccessToken() {
  const response = await fetch('http://localhost:3000/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
  if (response.ok) {
    const data = await response.json();
    accessToken = data.accessToken;
    localStorage.setItem('accessToken', data.accessToken);
    return accessToken;
  } else {
    throw new Error('Unable to refresh token');
  }
}

async function getAccessToken() {
  if (!accessToken || isTokenExpired(accessToken)) {
    await refreshAccessToken();
  }
  return accessToken;
}

function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= payload.exp * 1000;
}

// Initialize tokens from localStorage
loadTokens();

export { getAccessToken, saveTokens };
