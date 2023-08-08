import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import ButtonGroups from "../components/LivePage/ButtonGroups";
import Button from "@mui/material/Button";
import ChatBox from "../components/LivePage/ChatBox";
import ViewersCarousel from "../components/LivePage/ViewersCarousel";

// 나중에 CSS로 화면 + 버튼그룹 / 채팅창 + 나가기 버튼으로 세로열 맞추기

function LivePage() {
  const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeHeightSize = isMediumScreen ? "" : "75vh";
  const changeChatBoxSize = isMediumScreen ? "95%" : "90%";
  const changeChatBoxMarginTop = isMediumScreen ? "10px" : "0";

  useEffect(() => {
    document.body.classList.add("live-page");

    return () => {
      document.body.classList.remove("live-page");
    };
  }, []);

  const handleExitLive = () => {
    window.close();
    // 나가기 누르면 그냥 윈도우 꺼지게만 해둠. 여기 고치면 됨.
  };

  const viewers = [
    "강아지",
    "레서판다",
    "닭",
    "펭귄",
    "익룡",
    "호모사피엔스",
    "감자",
    "고구마",
    "개미핥기",
    "호모에렉투스",
    "고대초전도체",
    "터미네이터",
    "구글",
    "구글",
    "구글",
    "구글",
    "구글",
    "구글",
    "쿼카",
    "연세우유생크림빵",
    "국뽕치사량흡입",
  ];

  return (
    <div>
      <Grid
        container
        justifyContent={"space-evenly"}
        alignItems={"center"}
        // spacing={4}
        style={{ height: `${changeHeightSize}` }}
      >
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          xs={12}
          md={8}
          style={{ height: "100%" }}
          className="broadcast-grid"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FFD9DF",
              border: "20px solid #9A4058",
              borderRadius: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              style={{
                width: "95%",
                height: "95%",
                // flexDirection: "column",
              }}
            >
              <Grid
                item
                container
                // xs={12}
                justifyContent={"center"}
                alignItems={"center"}
                style={{ height: "70%" }}
              >
                <Grid
                  item
                  xs={10}
                  style={{
                    height: "100%",
                    minHeight: "200px",
                    minWidth: "300px",
                    // height: "300px",
                    backgroundColor: "green",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                  }}
                  className="live-display"
                >
                  <p>방송자 화면</p>
                </Grid>
              </Grid>
              <Grid
                container
                item
                // xs={12}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                // style={{ height: "30%" }}
              >
                <ViewersCarousel viewers={viewers} />
              </Grid>
            </Grid>
          </div>
        </Grid>
        {isMediumScreen && (
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            style={{ marginTop: "10px", height: "" }}
            className="button-grid"
          >
            <Grid
              item
              md={5}
              xs={10}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <ButtonGroups />
            </Grid>
          </Grid>
        )}
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          xs={12}
          md={3}
          style={{ height: "100%" }}
          className="chat-grid"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FFD9DF",
              border: "20px solid #9A4058",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: `${changeChatBoxMarginTop}`,
            }}
          >
            <div
              style={{
                width: `${changeChatBoxSize}`,
                height: "95%",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "95%",
                  height: "75%",
                }}
                className="chat-display"
              >
                <p>닭 : 꼬</p>
                <p>강아지 : 야옹</p>
                <p>구글 : 저도 아이폰 씁니다.</p>
              </div>
              <div
                style={{
                  justifyContent: "start",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                채팅 입력창
              </div>
              <div
                style={{
                  width: "95%",
                  height: "15%",
                }}
              >
                <ChatBox />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      {!isMediumScreen && (
        <Grid
          container
          justifyContent={"space-evenly"}
          alignItems={"center"}
          style={{ marginTop: "60px", height: "10vh" }}
          className="button-grid"
        >
          <Grid
            item
            md={5}
            xs={10}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ButtonGroups />
          </Grid>

          <Grid
            container
            item
            xs={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
              className="exit-live-button"
              variant="contained"
              style={{
                fontFamily: "MaplestoryOTFBold",
                width: "100%",
                height: "100%",
                fontSize: "25px",
                color: "white",
                borderRadius: "20px",
                texShadow: "0.1px 0.1px 4px #e892a4",
                boxSizing: "border-box",
              }}
              onClick={handleExitLive}
            >
              나가기
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default LivePage;
