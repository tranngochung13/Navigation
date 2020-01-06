import callApi from './utils';

export const register = data => {
  return callApi('/auth/register', 'POST', data);
};

export const login = data => {
  return callApi('/auth/login', 'POST', data);
};
