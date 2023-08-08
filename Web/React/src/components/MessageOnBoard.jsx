import React from "react";
import StickyNote1 from "../assets/Sticky-Note-01-Yellow.png";
// import StickyNote2 from "../assets/Sticky-Note-02-Green.png";
// import StickyNote3 from "../assets/Sticky-Note-02-Pink.png";
// import StickyNote4 from "../assets/Sticky-Note-03-Orange.png";
// import StickyNote5 from "../assets/Sticky-Note-04-Purple.png";

import { Grid } from "@mui/material";

// 메시지보드에 뜨는 메시지 색을 알록달록하게 하니까 더 보기 안 좋아서 노란색으로 통일해둠..

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

function MessageOnBoard(props) {
  // const RandomStickyNote = getRandomStickyNote();

  const { message, onClick } = props;

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
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img
        src={StickyNote1}
        // src={RandomStickyNote}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
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
              src={message.user_profile}
              alt=""
              style={{
                width: "30px",
                height: "30px",
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
            {getLength(message.user_nickname, 10)}
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
        {getLength(message.letter_title, 15)}
      </div>
    </div>
  );
}

export default MessageOnBoard;
