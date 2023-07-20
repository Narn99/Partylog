import React from "react";
import kakaoButton from "../assets/kakao_login_large_narrow.png";
import googleplay from "../assets/googleplay.png";
import "../css/LogInPage.css";


const LogInPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const styles = [
    {
      color: 'hsl(50, 75%, 55%)',
      textShadow: '1px 1px hsl(50, 75%, 45%), 2px 2px hsl(50, 45%, 45%), 3px 3px hsl(50, 45%, 45%), 4px 4px hsl(50, 75%, 45%)',
    },
    {
      color: 'hsl(135, 35%, 55%)',
      textShadow: '1px 1px hsl(135, 35%, 45%), 2px 2px hsl(135, 35%, 45%), 3px 3px hsl(135, 35%, 45%), 4px 4px hsl(135, 35%, 45%)',
    },
    {
      color: 'hsl(155, 35%, 60%)',
      textShadow: '1px 1px hsl(155, 25%, 50%), 2px 2px hsl(155, 25%, 50%), 3px 3px hsl(155, 25%, 50%), 4px 4px hsl(140, 25%, 50%)',
    },
    {
      color: 'hsl(30, 65%, 60%)',
      textShadow: '1px 1px hsl(30, 45%, 50%), 2px 2px hsl(30, 45%, 50%), 3px 3px hsl(30, 45%, 50%), 4px 4px hsl(30, 45%, 50%)',
    },
  ];
  
  const word1 = "PartyLog".split('').map((char, index) => <span style={styles[index % 4]}>{char}</span>);
  const word2 = "HAPPY BIRTHDAY!".split('').map((char, index) => <span style={styles[index % 4]}>{char}</span>);

  return (
    <div className="loginpage-body">
      <div className="content" id="content">
        <h1 id="PartyLog" className="loginpage-h1">
          {word1}
        </h1>
        <h1 className="loginpage-h1">
          {word2}
        </h1>
        <p style={{ fontFamily: 'HakgyoansimWoojuR', fontSize: '20px' }}>친구들과 당신의 소중한 날을 기념하세요</p>
        <img src={kakaoButton} onClick={handlekakaoLogin} alt="Kakao Login" />
        <p style={{ fontFamily: 'HakgyoansimWoojuR', fontSize: '20px' }}>앱을 다운로드하세요</p>
        <div className="download-container">
          <img
            src={googleplay}
            alt="Download on Google Play"
            className="googleplay-image"
            style={{ width: "360px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
