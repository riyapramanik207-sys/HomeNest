
const API_BASE_URL = 'http://localhost:8080/api';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || data.message || `API request failed: ${response.status}`
    );
  }

  return data;
}

export function apiGet(path) {
  return apiRequest(path, { method: 'GET' });
}

export function apiPost(path, body) {
  return apiRequest(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// Authentication API functions
export function registerUser(userData) {
  return apiPost('/auth/register', userData);
}

export function loginUser(credentials) {
  return apiPost('/auth/login', credentials);
}

export function getCurrentUser() {
  return apiGet('/auth/me');
}

export function logoutUser() {
  return apiPost('/auth/logout', {});
}
