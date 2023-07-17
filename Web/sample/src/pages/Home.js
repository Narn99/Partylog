import React from "react";
import kakaoButton from '../assets/kakao_login_large_narrow.png'
import googleplay from '../assets/googleplay.png'
import './LogInPage.css';  // CSS를 import 합니다.

const LogInPage = () => {
    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    const handlekakaoLogin = () => {
      window.location.href = KAKAO_AUTH_URL;
    }
  
    return (
      <div className="container">
        <div className="content">
          <h1>Partylog</h1>
          <p>친구들에게 메시지를 남기고 함께 파티를 즐기려면 가입해주세요</p>
          <img src={kakaoButton} onClick={handlekakaoLogin} alt="Kakao Login"/>
          <p>앱을 다운로드하세요</p>
          <div style={{ 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100vh',  // 높이를 100vh로 설정하여 전체 높이를 채웁니다. 필요에 따라 조정 가능합니다.
 }}>
    <img src={googleplay} alt="Download on Google Play" style={{ 
        width: '150px', 
        height: 'auto'
    }}/>
</div>
        </div>
      </div>
    )
}

export default LogInPage;
