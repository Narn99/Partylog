import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ButtonGroups from "../components/LivePage/ButtonGroups";
import ChatBox from "../components/LivePage/ChatBox";

function LivePage() {
  useEffect(() => {
    document.body.classList.add("live-page");

    return () => {
      document.body.classList.remove("live-page");
    };
  }, []);

  const tempUsers = [
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
    "초전도체",
    "터미네이터",
    "구글",
    "구글",
    "구글",
    "구글",
    "구글",
    "구글",
  ];

  return (
    <div>
      <Grid
        container
        justifyContent={"space-evenly"}
        alignItems={"center"}
        // spacing={4}
        style={{ height: "75vh" }}
      >
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          xs={8}
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
              }}
            >
              <Grid
                item
                container
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid
                  item
                  xs={8}
                  style={{
                    height: "300px",
                    backgroundColor: "green",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                  }}
                  className="live-display"
                >
                  <h3>방송자 화면</h3>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent={"space-evenly"}
                alignItems={"center"}
              >
                {/* 참가자 1명당 1칸 차지하게 하는 곳, 나중에 API에서 받는 데이터에 맞게 수정해야됨. */}
                {tempUsers.map((username, index) => (
                  <Grid
                    item
                    xs={2}
                    key={`userNo-${index}`}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        backgroundColor: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "15px",
                      }}
                      className="viewer-display"
                    >
                      <h3>{username}</h3>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          xs={3}
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
            }}
          >
            <div
              style={{
                width: "90%",
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
              채팅 입력창
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
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ marginTop: "60px", height: "10vh" }}
        className="button-grid"
      >
        <Grid
          item
          xs={5}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ButtonGroups />
        </Grid>
      </Grid>
    </div>
  );
}

export default LivePage;
