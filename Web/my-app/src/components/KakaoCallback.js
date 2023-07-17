import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoCallback = async () => {
    const navigate = useNavigate();
    const kakaoLogin = async () => {
        await axios
          .get(`http://localhost:8080/test/auth/kakao`)
          .then((res) => {
            localStorage.setItem('token', res.headers.authorization)
            window.location.href = "/";
          })
      }
    useEffect(() => {
        const params= new URL(window.location.href).searchParams;
        const code = params.get('code');
        console.log("작동")
        console.log(code)
        // 서버에 인가코드 받은 것을 보내야함
        // const grantType = "authorization_code";
        // const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
        // const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

        // axios.post(
        //     `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        //     {},
        //     { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        // )
        // .then((res) => {
        //     console.log(res);
        //     const { access_token } = res.data;
        //     axios.post(
        //         `https://kapi.kakao.com/v2/user/me`,
        //         {},
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${access_token}`,
        //                 "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        //             }
        //         }
        //     )
        //     .then((res) => {
        //         console.log('성공', res);
        //         // navigate('/');  // 홈으로 이동
        //     })
        // })
        // .catch((Error) => {
        //     console.log(Error)
        //     console.log('카카오에서 토큰을 받지 못했습니다')
        // })
        
          kakaoLogin()


    }, [navigate]); 
    
    return(
        <></>
    )
}
export default KakaoCallback;
