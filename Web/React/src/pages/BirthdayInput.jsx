import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cake from "../image/Cake.png";
import "../css/BirthdayInput.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
// import { createTheme } from "@mui/material";
// import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#fbb3c2", // 여기에 원하는 primary 색상을 지정합니다.
//     },
//   },
// });

function BirthdayInput(props) {

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const navigate = useNavigate();

  var [birthday, setbirthday] = useState("");

  const changeBirthday = (date) => {
    setbirthday(date);
  }

  const join = () => {
    const {userNo} = JSON.parse(localStorage.getItem("userInfo"));
    axios.post(
      `${SERVER_API_URL}/user/join`,
      {
        "userNo" : userNo,
        "userBirthday" : birthday
      }
    )
    .then((res) => {
      console.log(res)
      if(res.data.code === "200") {
        var userInfo = res.data.userInfo;
        // 토큰 저장
        localStorage.setItem("access-token", res.headers.get("authorization"));
        localStorage.setItem("refresh-token", res.headers.get("refresh-token"));
        navigate(`/mypage/${userInfo.userNo}`);
      } else {
        console.log("회원가입에 실패했습니다.");
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <div className="center">
      <Grid container>
        <Grid item xs={12}>
          <h1 className="loginpage-h1">Partylog</h1>
        </Grid>
        <Grid item xs={12}>
          <h2 style={{ fontFamily: "MaplestoryOTFLight" }}>
            서비스 이용을 위해 생일을 입력해주세요!
          </h2>
        </Grid>
        <Grid item xs={12}>
          <h4>(가입 시 한 번만 입력합니다!)</h4>
        </Grid>
        <Grid item xs={12} margin={"10px"}>
          <img src={Cake} alt="Birthday Cake!!" className="cake-image" />
        </Grid>
        {/* <ThemeProvider theme={theme}> */}
        <Grid item xs={12} margin={"10px"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            format="YYYY / MM / DD" 
            value={birthday}
            onChange={(date) => changeBirthday(date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ fontFamily: "MaplestoryOTFBold" }}
            className="submit-button"
            onClick={join}
          >
            제출
          </Button>
        </Grid>
        {/* </ThemeProvider> */}
      </Grid>
    </div>
  );
}

export default BirthdayInput;
