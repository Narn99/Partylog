import React from "react";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function NavBar() {

  const navigate = useNavigate();


  const logout = () => {

    const accessToken = localStorage.getItem("access-token");
    

    // 카카오 로그아웃 요청
    axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`}
    })
      .then(() => {
        // 로컬 토큰 제거
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        // 성공적으로 로그아웃한 후 로그인 페이지로 이동
        navigate("/");
      })
      .catch(error => {
        console.error("로그아웃 실패: ", error);
      });
  };

  return (
    <div
      className="nav-bar"
      style={{ paddingBottom: "10px", borderBottom: "1px solid lightgrey" }}
    >
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item container xs={3}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <h1 className="nav-bar-logo">Partylog</h1>
          </Grid>
        </Grid>
        <Grid container item xs={7} justifyContent={"flex-end"}>
          <Grid item xs={4}>
            <SearchFriend />
          </Grid>
        </Grid>
        <Grid container item xs={2} justifyContent={"flex-end"}>
          <Grid container item xs={10} justifyContent={"flex-end"}>
            
            <img
              src={molru}
              alt="settingimg"
              className="nav-bar-settingimg"
              style={{
                borderRadius: "30%",
                maxWidth: "80px",
                maxHeight: "80px",
              }}
              onClick={logout}
            />
         
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NavBar;
