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
        console.log(res);
        var userInfo = res.data.userInfo;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        if (res.data.code === "201") {
          // 생일입력 페이지로 이동
<<<<<<< HEAD
          localStorage.setItem(
            "access-token",
            res.headers.get("authorization")
          );
          localStorage.setItem(
            "refresh-token",
            res.headers.get("refresh-token")
          );
          navigate("/birthdayinput");
=======
          navigate("/birthdayinput")
>>>>>>> 15b3dac60932d9c67118fc9aa3b19feffcd4906b
        } else {
          localStorage.setItem("access-token", res.headers.get("authorization"));
          localStorage.setItem("refresh-token", res.headers.get("refresh-token"));
          navigate(`/user/${userInfo.userNo}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <p>로그인 중 입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};
export default KakaoCallback;
