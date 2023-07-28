import React from "react";
import board from "../assets/Message-Board.svg";

function MessageBoard() {
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
        <div style={{ width: "90%", height: "90%" }}></div>
      </div>
    </div>
  );
}

export default MessageBoard;
