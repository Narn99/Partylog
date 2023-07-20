import * as actionTypes from './actionTypes';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
