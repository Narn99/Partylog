import {
  TextField
  //  styled
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Send from "@mui/icons-material/Send";
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

function ChatBox(props) {
  const {session} = props;
  // console.log(session);
  const [chatContent, setChatContent] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  
  const handleInputChat = (event) => {
    const { value } = event.target;
    const truncatedValue = value.slice(0, 50);
    setChatContent(truncatedValue);
  };
  const handleSendMessages = () => {
    // console.log(session);
    // Sender of the message (after 'session.connect')
    session.signal({
     data: chatContent,  // Any string (optional)
     to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
     type: 'my-chat'             // The type of message (optional)
    })
    .then(() => {
        setChatContent("");
        console.log('Message successfully sent');
    })
    .catch(error => {
        console.error(error);
    }); 
  }

  // 새 메시지가 도착할 때마다 채팅 메시지 목록을 업데이트
  useEffect(() => {
    const handleReceivedMessage = (event) => {
      let writerName = ""; // 기본값 설정

      try {
       const eventData = JSON.parse(event.from.data); // JSON 문자열을 객체로 변환
       if (eventData.clientData) {
       writerName = eventData.clientData; // "이름"을 추출
       }
     } catch (error) {
        console.error("Error parsing event data:", error);
      }
      const chatMsg = {
        writer: writerName,
        content: event.data,
      };
      setChatMessages((prevMessages) => [...prevMessages, chatMsg]); // 새 메시지를 배열에 추가
    };

    session.on("signal", handleReceivedMessage);

    return () => {
      session.off("signal", handleReceivedMessage); // 컴포넌트 언마운트 시 정리
    };
  }, [session]);


  return (<div style={{height:"100%", width:"100%"}}><div
    style={{
      width: "95%",
      height: "75%",
    }}
    className="chat-display"
  >
    {/* 채팅 메시지 렌더링 */}
    {chatMessages.map((message, index) => (
          <p key={index}>{`${message.writer}: ${message.content}`}</p>
        ))}
  </div>
  {/* <div
    style={{
      justifyContent: "start",
      alignItems: "center",
      display: "flex",
    }}
  >
    채팅 입력창
  </div> */}
  <div
    style={{
      width: "95%",
      height: "15%",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "90%",
        // border: "1px solid grey",
        // borderRadius: "15px",
      }}
    >
      <div>
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
      <Send onClick={handleSendMessages}/>
    </div>
    </div>
    </div>

  );
}

export default ChatBox;
