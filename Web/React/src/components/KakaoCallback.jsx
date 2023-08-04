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
        var userNo = res.data.data;

        if(res.data.code === "201") {
          // 생일입력 페이지로 이동
          navigate(`/birthdayinput/${userNo}`);
        } else if(res.data.code === "200") {
          navigate(`/mypage/${userNo}`);
        } else {
          alert(res.data.message);
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
