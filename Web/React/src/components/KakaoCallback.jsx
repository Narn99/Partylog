import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    kakaoLogin(code);
  });

  const kakaoLogin = (code) => {
   axios
      .get(`${SERVER_API_URL}/user/login?code=${code}`)
      .then((res) => {
        if(res.data.accessToken == null) {
          navigate("/birthdayinput")
        } else {
          var userInfo = {
            "userNo" : res.data.userNo,
            "userNickname" : res.data.userNickname,
            "userBirthday" : res.data.userBirthday,
            "userProfile" : res.data.userProfile,
          };
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          navigate("/mypage");
        }

        // 로그인이 완료되면 마이페이지로 이동
        // 추후에 토큰은 백엔드로 전송하고, 백엔드로부터 액세스 코드를 새로 받아서 쿠키에 저장하는 것으로 바꿀 것.
        
      })
      .catch((e) => {
        console.log(e);
      })
  };

  return (
    <div>
      <p>로그인 중 입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};
export default KakaoCallback;
