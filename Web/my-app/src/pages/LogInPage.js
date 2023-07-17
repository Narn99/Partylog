// 카카오 로그인 구현
import React from "react";
import kakaoButton from '../assets/kakao_login_large_narrow.png'


const LogInPage = () => {
    // 카카오 로그인 함수를 실행시키면 아래에 설정된 KAKAO_AUTH_URL주소로 이동
    // 이동된 창에서 카카오계정 로그인을 시도할 수 있으며 로그인 버튼 클릭시
    // Redirect URL로 이동하면서 빈화면과 함께 인가코드가 발급됨(인가코드는 파라미터에)
    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    const handlekakaoLogin = () => {
      window.location.href = KAKAO_AUTH_URL;
    }
  
    return (
      <div>
        <img src={kakaoButton} onClick={handlekakaoLogin}/>
      </div>
    )
    
  }
export default LogInPage;