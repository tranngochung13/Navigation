import * as Types from './action';

const initialState = {
  user: {},
  error: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INITIAL_USER:
      return {...state, user: action.payload};
    case Types.ADD_USER:
      return {...state, loading: true};
    case Types.ADD_USER_SUCCESS:
      return {...state, user: action.payload, loading: false};
    case Types.ADD_USER_FAILURE:
      return {...state, error: action.payload, loading: false};

    case Types.LOGIN_USER:
      return {...state, user: action.data, loading: true};
    case Types.LOGIN_USER_SUCCESS:
      return {...state, user: action.payload, loading: false};
    case Types.LOGIN_USER_FAILURE:
      return {...state, error: action.payload, loading: false};

    case Types.LOGOUT_USER_SUCCESS:
      return {...state, user: action.payload, loading: false};
    default:
      return state;
  }
};

export default userReducer;
