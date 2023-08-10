import React from "react";
import SearchFriend from "../components/SearchFriend";
import logo from "../assets/LOGO3.png";
// import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
// import bg from "../image/TempBg.png";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/actions";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const profileImg = useSelector((state) => {
    return state.auth.userData.userProfile;
  });

  const userNo = useSelector((state) => {
    return state.auth.userData.userNo;
  });

  const logout = () => {
    // 카카오 로그아웃 요청
    axios
      .post(`${SERVER_API_URL}/user/logout/${userNo}`)
      .then(() => {
        // 로컬 토큰 제거
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");

        // authReducer를 통한 유저정보 삭제
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.error("로그아웃 실패: ", error);
      });
  };

  const handleClickLogo = () => {
    if (userNo) {
      navigate(`/user/${userNo}`);
      window.location.reload();
    }
  };

  const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeLogoSize = isMediumScreen ? "200px" : "300px";
  const changeNavbarPosition = isMediumScreen ? "static" : "sticky";
  // const changeNavbarBg = isMediumScreen ? "none" : `url(${bg})`;
  const changeNavbarBgColor = isMediumScreen ? "" : "white";
  const changeIconSize = isSmallScreen ? "60px" : "80px";

  return (
    <div
      className="nav-bar"
      style={{
        position: changeNavbarPosition,
        // backgroundImage: changeNavbarBg,
        backgroundColor: changeNavbarBgColor,
        top: 0,
        zIndex: 999,
        paddingBottom: "10px",
        marginBottom: "25px",
        // borderBottom: "1px solid lightgrey",
      }}
    >
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid
          item
          container
          xs={3}
          justifyContent={"end"}
          className="logo-and-icon"
        >
          <Grid item container justifyContent={"center"} alignItems={"center"}>
            {/* <h1 className="nav-bar-logo">Partylog</h1> */}
            {isSmallScreen && (
              <img
                src={icon6}
                alt=""
                style={{
                  maxWidth: changeIconSize,
                  maxHeight: changeIconSize,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              />
            )}
            {!isSmallScreen && (
              <img
                src={logo}
                alt=""
                style={{
                  width: `${changeLogoSize}`,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              />
            )}
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          justifyContent={"flex-end"}
          className="search-friend-bar"
        >
          <Grid item xs={12} sm={10} md={7}>
            <SearchFriend />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={3}
          sm={2}
          lg={1}
          justifyContent={"flex-end"}
          className="nav-bar-profile"
        >
          <Grid
            container
            item
            xs={8}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            {/* <Grid
              item
              container
              xs={7}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <h3>{tempUserName} 님</h3>
            </Grid> */}
            <Grid
              item
              container
              xs={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img
                src={profileImg}
                alt="settingimg"
                className="nav-bar-settingimg"
                style={{
                  borderRadius: "35%",
                  maxWidth: changeIconSize,
                  maxHeight: changeIconSize,
                }}
                onClick={logout}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NavBar;
