// Redux의 액션 생성자(action creators)
// 로그인 및 유저 정보 관련 액션
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const CHANGE_USERNAME = "CHANGE_USERNAME";

export const logIn = (
  email,
  userId,
  username,
  accessToken,
  category,
  googleId = ""
) => {
  if (category === null) {
    category = [];
  }
  return {
    type: LOG_IN,
    payload: {
      email,
      userId,
      username,
      googleId,
      accessToken,
      category,
      isLogedIn: true,
      isFirstLogedIn: false,
    },
  };
};



export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: {
      email: "",
      userId: "",
      username: "",
      googleId: "",
      accessToken: "",
      category: [],
      isLogedIn: false,
      isFirstLogedIn: false,
    },
  };
};

export const changeUsername = (username) => {
  return {
    type: CHANGE_USERNAME,
    payload: {
      username,
    },
  };
};



