import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoCallback = async () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");

    const kakaoLogin = async () => {
      await axios
        .get(`http://localhost:8080/user/kakao/callback?code=${code}`)
        .then((res) => {
          localStorage.setItem("token", res.headers.authorization);
          window.location.href = "/mypage";
          // 로그인이 완료되면 마이페이지로 이동
          // 추후에 토큰은 백엔드로 전송하고, 백엔드로부터 액세스 코드를 새로 받아서 쿠키에 저장하는 것으로 바꿀 것.
        });
    };
    kakaoLogin();
  }, [navigate]);

  return <></>;
};
export default KakaoCallback;
