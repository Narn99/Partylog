import * as actionTypes from "./actionTypes";
import axios from "axios";

export const loginSuccess = (token) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: token,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const loadUser = (user) => ({
  type: actionTypes.LOAD_USER,
  payload: user,
});

export const login = (code) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:8080/user/kakao/callback?code=${code}`
  );
  dispatch(loginSuccess(res.headers.authorization));
};

export const getUserInfo = (token) => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(loadUser(res.data));
};
