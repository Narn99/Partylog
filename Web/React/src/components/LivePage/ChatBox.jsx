import {
  TextField,
  //  styled
} from "@mui/material";
import React, { useState } from "react";

// const StyledTextarea = styled(TextField)(
//   ({ theme }) => `
//     width: 320px;
//     font-family: IBM Plex Sans, sans-serif;
//     font-size: 0.875rem;
//     font-weight: 400;
//     line-height: 1.5;
//     padding: 12px;
//     width: 100%;
//     background: transparent;
//     };

//     & .MuiInputBase-input:focus {
//       outline: none; /* 입력 요소가 포커스를 받을 때 포커스 테두리를 제거합니다. */
//   `
// );

function ChatBox() {
  const [chatContent, setChatContent] = useState("");
  const handleInputChat = (event) => {
    const { value } = event.target;
    const truncatedValue = value.slice(0, 50);
    setChatContent(truncatedValue);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        // border: "1px solid grey",
        // borderRadius: "15px",
      }}
    >
      <TextField
        id="outlined-multiline-static"
        label="채팅 입력"
        multiline
        minRows={2}
        maxRows={2}
        placeholder="채팅란"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "15px",
          fontSize: "small",
        }}
        value={chatContent}
        onChange={handleInputChat}
        // defaultValue=""
      />
      {/* <StyledTextarea
        Grid
        item
        multiline
        maxRows={3}
        placeholder="채팅란"
        variant="standard"
        // maxLength={50}
        value={chatContent}
        onChange={setChatContent}
      /> */}
    </div>
  );
}

export default ChatBox;
