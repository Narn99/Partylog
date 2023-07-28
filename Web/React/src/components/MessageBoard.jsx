import React, { useState } from "react";
import board from "../assets/Message-Board.svg";
import molru from "../assets/molru.webp";
import MessageOnBoard from "./MessageOnBoard";
import { Grid } from "@mui/material";

function MessageBoard() {
  const tempUser = [
    {
      userNo: "1",
      profile: molru,
      nickname: "야로나",
      title: "몰?루",
    },
    { userNo: "2", profile: null, nickname: "앗", title: "앗" },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          backgroundImage: `url(${board})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "100%",
          // 반응형으로 구성하려면 이쪽 부분이 바뀌어야됨.
          // 아니면 lg, sm 등에 따라 height가 바뀌도록 직접 설정
          height: "520px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 이 부분이 보드 위의 메시지
        추후에 받는 데이터로 CSS 수정 및 기능 추가해야합니다. */}
        <div style={{ width: "92%", height: "90%" }}>
          <Grid container justifyContent={"flex-start"} spacing={1}>
            {tempUser.map((user) => (
              <Grid item xs={6} sm={3}>
                <MessageOnBoard key={user.userNo} user={user} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;
