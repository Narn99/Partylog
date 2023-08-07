import * as actionTypes from "./actionTypes";
// import axios from "axios";

// const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

// 로그인 관련 액션

export const loginSaveUserNo = (userNo) => ({
  type: actionTypes.LOGIN_SAVE_USERNO,
  payload: userNo,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const saveUserData = (
  userNo,
  userNickname,
  userBirthday,
  userProfile
) => ({
  type: actionTypes.SAVE_USERDATA,
  payload: {
    userNo: userNo,
    userNickname: userNickname,
    userBirthday: userBirthday,
    userProfile: userProfile,
  },
});

// export const login = (code) => async (dispatch) => {
//   const res = await axios.get(
//     `http://localhost:8080/user/kakao/callback?code=${code}`
//   );
//   dispatch(loginSuccess(res.headers.authorization));
// };

// export const getUserInfo = (token) => async (dispatch) => {
//   const res = await axios.get("http://localhost:8080/user", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   dispatch(loadUser(res.data));
// };

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
  // 메시지를 보내는 기능. 추후 API 연결하면 그에 맞게 return쪽과 리듀서도 수정
  // 메시지 보드는 계속 보고 있는거니, POST 이후에 갱신된 메시지 리스트를 다시 GET할 수 있어야.
  // 또 메시지는 1개만 남길 수 있게 해야하지 않을까?

  // const postMessage = axios
  //   .post(`${SERVER_API_URL}/letter/send`, {
  //     letterTitle: modalTitle,
  //     letterContent: modalDescription,
  //     letterReceiver: "",
  //   })
  //   .then((res) => res.data)
  //   .catch((error) => console.log(error));

  return {
    type: actionTypes.ADD_MESSAGE_DATA,
    payload: {
      modalTitle,
      modalDescription,
    },
  };
};

// 남긴 메시지 삭제하는 기능.. 추후에 본인 userNo를 비교해서 해당하는거 삭제하도록
export const deleteMessageData = (userNo) => {
  return {
    type: actionTypes.DELETE_MESSAGE_DATA,
    payload: {
      userNo,
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

export const getMessageList = () => {
  // 추후에 메시지 리스트 받아오는 것
  // const messagesList = axios
  //   .get(`${SERVER_API_URL}/letter/list/${type}/${year}/${offset}/${limit}`)
  //   .then((res) => res.data)
  //   .catch((error) => console.log(error));

  return {
    type: actionTypes.GET_MESSAGE_LIST,
    // payload: messagesList
  };
};

export const getMessageDetail = () => {
  // 추후에 메시지 1개 상세 가져오기
  // const messageDetail = axios
  //   .get(`${SERVER_API_URL}/letter/detail/${letterId}`)
  //   .then((res) => res.data)
  //   .catch((error) => console.log(error));

  return {
    type: actionTypes.GET_MESSAGE_DETAIL,
    // payload: messageDetail,
  };
};
