import React, { useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        kakaoLogin(code)
    }); 

    const kakaoLogin = (code) => {
       axios.get(`http://localhost:8080/partylog/kakao/login?code=${code}`)
       .then((res) => {
        console.log("사용자 정보")
        console.log(res)
        navigate("/")
       })
      }
    
    return (
        <div>
            <h1>로그인 중 입니다. 잠시만 기다려주세요.</h1>
        </div>
    );
}

export default KakaoCallback;