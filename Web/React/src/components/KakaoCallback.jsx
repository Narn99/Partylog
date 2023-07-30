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
        var userInfo = {
          "userNo" : res.data.userNo,
          "userNickname" : res.data.userNickname,
          "userBirthday" : res.data.userBirthday,
          "userProfile" : res.data.userProfile,
        };
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        if(res.data.accessToken == null) {
          navigate("/birthdayinput")
        } else {
          navigate("/mypage");
        }
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
