import React from "react";
import { useEffect } from "react";
import axios from "axios";

const KakaoCallback = () => {
    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
        const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
        const CLIENT_SECRET = `${process.env.REACT_APP_KAKAO_CLIENT_SECRET}`;
        kakaoLogin(grantType, REST_API_KEY, REDIRECT_URI, code, CLIENT_SECRET)
    }); 

    const kakaoLogin = (grantType, REST_API_KEY, REDIRECT_URI, code, CLIENT_SECRET) => {
        axios.post(
            `https://kauth.kakao.com/oauth/token`,
            {
                "grant_type" : grantType,
                "client_id" : REST_API_KEY,
                "redirect_uri" : REDIRECT_URI,
                "code" : code,
                "client_secret" : CLIENT_SECRET
            },
            {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}}
          )
          .then((res) => {
            const {access_token} = res.data;
            console.log("토큰: " + access_token)
            axios.post(
                `https://kapi.kakao.com/v2/user/me`,
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8",
                    }
                }
            )
            .then((res) => {
                console.log(res)
            })
            .catch(() => {
                console.log("내정보 호출 오류")
            })
          })
          .catch((error) => {
            console.log("토큰 생성 오류")
            console.log(error)
          })
      }

      const kakaoLogout = () => {
        window.location.href=`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_URI}`;
        // axios.get(
        //     `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_URI}`
        // ).then((res) => {
        //     console.log("로그아웃")
        // })
      }
    
    return (
        <div>
            <h1>카카오 콜백 페이지</h1>
            <button onClick={kakaoLogout}>로그아웃</button>
        </div>
    );
}

export default KakaoCallback;