import * as actionTypes from "./actionTypes";
import axios from "axios";

// 로그인 관련 액션

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

// 메시지 작성 관련 액션

export const setModalData = (modalTitle, modalDescription) => {
  return {
    type: actionTypes.SET_MODAL_DATA,
    payload: {
      modalTitle,
      modalDescription,
    },
  };
};

export const addMessageData = (modalTitle, modalDescription) => {
  return {
    type: actionTypes.ADD_MESSAGE_DATA,
    payload: {
      modalTitle,
      modalDescription,
    },
  };
};

// 모달에 입력한 데이터 초기화하는 액션
export const resetModalData = () => {
  return {
    type: actionTypes.RESET_MODAL_DATA,
  };
};

// 메시지 목록 읽어오는 액션

export const getMessageData = () => {
  return {
    type: actionTypes.GET_MESSAGE_DATA,
  };
};
