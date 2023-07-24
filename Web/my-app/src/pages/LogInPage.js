// 카카오 로그인 구현
import React from "react";
import kakaoButton from "../assets/kakao_login_large_narrow.png";

const LogInPage = () => {
  // 카카오 로그인 함수를 실행시키면 아래에 설정된 KAKAO_AUTH_URL주소로 이동
  // 이동된 창에서 카카오계정 로그인을 시도할 수 있으며 로그인 버튼 클릭시
  // Redirect URL로 이동하면서 빈화면과 함께 인가코드가 발급됨(인가코드는 파라미터에)
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const scope = "profile_nickname, profile_image, account_email, birthday, talk_message, friends";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}`;
  // const KAKAO_AUTH_URL = `https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fscope%3Dprofile_nickname%252C%2520profile_image%252C%2520account_email%252C%2520birthday%252C%2520talk_message%252C%2520friends%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252FkakaoCallback%26through_account%3Dtrue%26client_id%3D7e939f3c5936dc4bc43aa3fc00ca7717#login`;

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <img src={kakaoButton} alt="카카오버튼" onClick={handlekakaoLogin} />
    </div>
  );
};
export default LogInPage;
