import React from "react";
import kakaoButton from "../assets/kakao_login_large_narrow.png";
import googleplay from "../assets/googleplay.png";
import "../css/LogInPage.css";
import { Grid, Container } from "@mui/material";

const LogInPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const styles = [
    {
      color: 'hsl(50, 75%, 55%)',
      textShadow: '1px 1px 10px hsl(50, 75%, 45%), 2px 2px 10px hsl(50, 45%, 45%), 3px 3px 10px hsl(50, 45%, 45%), 4px 4px 10px hsl(50, 75%, 45%)',
    },
    {
      color: 'hsl(135, 35%, 55%)',
      textShadow: '1px 1px 10px hsl(135, 35%, 45%), 2px 2px 10px hsl(135, 35%, 45%), 3px 3px 10px hsl(135, 35%, 45%), 4px 4px 10px hsl(135, 35%, 45%)',
    },
    {
      color: 'hsl(155, 35%, 60%)',
      textShadow: '1px 1px 10px hsl(155, 25%, 50%), 2px 2px 10px hsl(155, 25%, 50%), 3px 3px 10px hsl(155, 25%, 50%), 4px 4px 10px hsl(140, 25%, 50%)',
    },
    {
      color: 'hsl(30, 65%, 60%)',
      textShadow: '1px 1px 10px hsl(30, 45%, 50%), 2px 2px 10px hsl(30, 45%, 50%), 3px 3px 10px hsl(30, 45%, 50%), 4px 4px 10px hsl(30, 45%, 50%)',
    },
  ];

  const lettersPartyLog = "PartyLog".split('').map((char, index) => <span style={styles[index % 4]} key={index}>{char}</span>);
  const lettersHappyBirthday = "HAPPY BIRTHDAY!".split('').map((char, index) => <span style={styles[index % 4]} key={index}>{char}</span>);

  return (
    <Container maxWidth={false}>
    <div className="loginpage-container">
      <div className="" id="content">
        <div className="">
          <Grid container justifyContent={"center"}>
            <Grid item>
                <h1 className="loginpage-h1" id="PartyLog">
                  {lettersPartyLog}
                </h1>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <div className="animated-happybirthday">
                <h1 className="loginpage-h1">
                  {lettersHappyBirthday}
                </h1>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container justifyContent={"center"}>
          <Grid item xs={6} sm={5} md={4} lg={3}>
            <div
              className="login-window"
              style={{
                border: "1px solid #fbb3c2",
                borderRadius: "30px",
                backgroundColor: "#f5e7e9",
                boxShadow: "1px 1px 20px #fbb3c2",
                padding: "20px",
                marginTop: "30px",
              }}
            >
              <div style={{ marginBottom: "40px", marginTop: "30px" }}>
                <Grid container justifyContent={"center"}>
                  <Grid item container xs={10} justifyContent={"center"}>
                    <div className="kakao-button">
                      <img
                        src={kakaoButton}
                        onClick={handlekakaoLogin}
                        alt="Kakao Login"
                        className="loginpage-img"
                        style={{ boxShadow: "1px 1px 30px #fbb3c2" }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <hr
                style={{
                  border: "1px solid #fbb3c2",
                  // boxShadow: "10px 10px 20px #fbb3c2 ",
                }}
              />
              <div className="app-download" style={{ padding: "10px 0 0 0" }}>
                <Grid container justifyContent={"center"}>
                  <Grid
                    item
                    container
                    xs={8}
                    sm={10}
                    justifyContent={"center"}
                  >
                    <div className="download-container">
                      <img
                        src={googleplay}
                        alt="Download on Google Play"
                        className="loginpage-img"
                        style={{
                          maxWidth: "200px",
                          boxShadow: "1px 1px 30px #fbb3c2",
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  </Container>
  );
};

export default LogInPage;
