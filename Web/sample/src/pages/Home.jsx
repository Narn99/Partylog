import React from "react";
import kakaoButton from "../assets/kakao_login_large_narrow.png";
import googleplay from "../assets/googleplay.png";
import "./LogInPage.css";
import { Grid, Container } from "@mui/material";

const LogInPage = () => {
  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Container maxWidth={false}>
      <div className="container">
        <div className="content" id="content">
          <div className="title">
            <Grid container justifyContent={"center"}>
              <Grid item>
                <div className="logo">
                  <h1 id="PartyLog">
                    <span>P</span>
                    <span>a</span>
                    <span>r</span>
                    <span>t</span>
                    <span>y</span>
                    <span>L</span>
                    <span>o</span>
                    <span>g</span>
                  </h1>
                </div>
              </Grid>
            </Grid>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <div className="animated-happybirthday">
                  <h1>
                    <span>H</span>
                    <span>A</span>
                    <span>P</span>
                    <span>P</span>
                    <span>Y</span>
                    <span>&nbsp;</span>
                    <span>B</span>
                    <span>I</span>
                    <span>R</span>
                    <span>T</span>
                    <span></span>
                    <span>H</span>
                    <span>D</span>
                    <span>A</span>
                    <span>Y</span>
                    <span>!</span>
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
                          className="googleplay-image"
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
