import { apiGet } from './api';

export function getProperties() {
  return apiGet('/properties');
}

export function getPropertyById(id) {
  return apiGet(`/properties/${id}`);
}
