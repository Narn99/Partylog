import React from "react";
import StickyNote1 from "../assets/Sticky-Note-01-Yellow.png";
// import StickyNote2 from "../assets/Sticky-Note-02-Green.png";
// import StickyNote3 from "../assets/Sticky-Note-02-Pink.png";
// import StickyNote4 from "../assets/Sticky-Note-03-Orange.png";
// import StickyNote5 from "../assets/Sticky-Note-04-Purple.png";

import { Grid } from "@mui/material";

// 현재 모달에서 메시지 작성을 할 경우, 글자를 입력할 때마다 이쪽 포스트잇 이미지들이 리렌더링되는 이슈가 있음.
// 일단 노트 색을 하나로 통일해서 리렌더링돼도 안 변한 것처럼 보이게 해둠..

// const stickyNotes = [
//   StickyNote1,
//   StickyNote2,
//   StickyNote3,
//   StickyNote4,
//   StickyNote5,
// ];

// const getRandomStickyNote = () => {
//   const randomIndex = Math.floor(Math.random() * stickyNotes.length);
//   return stickyNotes[randomIndex];
// };

// 메시지 남긴 사람 프로필 이미지, 이름과 메시지 제목 필요
// 메시지 보드 안에 배치되는 메시지
// 랜덤 StickyNote를 불러오고, 그 위에 다른 정보가 뜨도록

function MessageOnBoard(props) {
  // const RandomStickyNote = getRandomStickyNote();

  const user = props.user;

  const getLength = (messageText, maxLength) => {
    if (messageText.length > maxLength) {
      return messageText.slice(0, maxLength) + "...";
    }
    return messageText;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={StickyNote1}
        // src={RandomStickyNote}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      {/* <RandomStickyNote /> */}
      <div
        style={{
          position: "absolute",
          top: "20%", // 위에서의 위치를 조정할 수 있습니다.
          left: "50%", // 왼쪽에서의 위치를 조정할 수 있습니다.
          transform: "translate(-50%, -50%)",
          textAlign: "start",
          fontSize: "15px",
          fontWeight: "bold",
          color: "black",
          overflow: "hidden",
          width: "80%",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            item
            container
            xs={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img
              src={user.profile}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            />{" "}
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              textAlign: "start",
            }}
          >
            &nbsp;&nbsp;&nbsp;
            {getLength(user.nickname, 10)}
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%", // 위에서의 위치를 조정할 수 있습니다.
          left: "50%", // 왼쪽에서의 위치를 조정할 수 있습니다.
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "17px",
          fontWeight: "bold",
          color: "black",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "80%",
          marginTop: "15px",
        }}
      >
        {getLength(user.title, 15)}
      </div>
    </div>
  );
}

export default MessageOnBoard;
