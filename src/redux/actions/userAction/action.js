export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = ' ADD_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = ' LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const INITIAL_USER = 'INITIAL_USER';

export const initUser = data => {
  return {
    type: INITIAL_USER,
    payload: data,
  };
};

export const addUser = data => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

export const addUserSuccess = data => {
  return {
    type: ADD_USER_SUCCESS,
    payload: data,
  };
};
export const addUserFailure = error => {
  return {
    type: ADD_USER_FAILURE,
    payload: error,
  };
};

export const loginUser = data => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const loginUserSuccess = data => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const loginUserFailure = error => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const logoutUserSuccess = data => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: data,
  };
};
