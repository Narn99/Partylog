import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  // useNavigate를 사용하기위한 변수선언
  const navigate = useNavigate();

  useEffect(() => {
    console.log("마운트 될때만 실행");
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    kakaoLogin(code);
    // eslint-disable-next-line
  }, []);

  const kakaoLogin = (code) => {
    axios.get(`http://localhost:8080/partylog/kakao/oauth/token?code=${code}`).then((res) => {
      console.log(res);
      navigate("/");
    });
  };

  return (
    <div>
      <h1>잠시만 기다려주세요. 로그인 중 입니다.</h1>
    </div>
  );
};

export default KakaoCallback;
