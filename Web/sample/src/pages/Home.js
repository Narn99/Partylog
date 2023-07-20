import React from "react";
import kakaoButton from "../assets/kakao_login_large_narrow.png";
import googleplay from "../assets/googleplay.png";
import "./LogInPage.css";
// import Cake from "../image/Cake.png";

const LogInPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="container">
      <div className="content" id="content">
        <h1 id="PartyLog">
          <span>P</span>
          <span>a</span>
          <span>r</span>
          <span>t</span>
          <span>y</span>
          <span>L</span>
          <span>o</span>
          <span>g</span>
        </h1>
        <h1>
          <span>H</span>
          <span>A</span>
          <span>P</span>
          <span>P</span>
          <span>Y</span>
          <span>&nbsp;</span>
          <span>B</span>
          <span>I</span>
          <span>R</span>
          <span>T</span>
          <span></span>
          <span>H</span>
          <span>D</span>
          <span>A</span>
          <span>Y</span>
          <span>!</span>
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
