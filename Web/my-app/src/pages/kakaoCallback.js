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
    axios.get(`http://localhost:8080/partylog/user/login?code=${code}`).then((res) => {
      if(res.data.accessToken == null) {
        console.log("회원가입 페이지로 이동시키기");
        console.log(res.data)
      } else {
        console.log("로그인 성공")
        console.log(res)
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h1>로그인 중 입니다. 잠시만 기다려주세요.</h1>
    </div>
  );
};

export default KakaoCallback;
