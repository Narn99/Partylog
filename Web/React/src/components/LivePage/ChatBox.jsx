import {
  TextField,
  //  styled
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Send from "@mui/icons-material/Send";

function ChatBox(props) {
  const { session } = props;
  // console.log(session);
  const [chatContent, setChatContent] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatDisplayRef = useRef(null);

  const handleInputChat = (event) => {
    const { value } = event.target;
    const truncatedValue = value.slice(0, 50);
    setChatContent(truncatedValue);
  };
  const handleSendMessages = () => {
    // console.log(session);
    // Sender of the message (after 'session.connect')
    session
      .signal({
        data: chatContent, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "my-chat", // The type of message (optional)
      })
      .then(() => {
        setChatContent("");
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePressEnter = (event) => {
    if (chatContent.trim() && event.key === "Enter") {
      handleSendMessages();
    }
  };

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
    if (session) {
      session.on("signal", handleReceivedMessage);
    }

    return () => {
      session.off("signal", handleReceivedMessage); // 컴포넌트 언마운트 시 정리
    };
  }, [session]);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "95%",
          height: "75%",
          overflowY: "scroll",
        }}
        ref={chatDisplayRef}
        className="chat-display"
      >
        {/* 채팅 메시지 렌더링 */}
        {chatMessages.map((message, index) => (
          <p
            key={index}
            style={{ marginLeft: "5px" }}
          >{`${message.writer} : ${message.content}`}</p>
        ))}
      </div>

      <div
        style={{
          width: "95%",
          height: "20%",
          marginTop: "10px",
          display: "flex", // Added this to enable flex layout
          flexDirection: "column", // Change this to "column"
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "relative" }}>
          <TextField
            id="outlined-multiline-static"
            label="채팅 입력"
            multiline
            minRows={3}
            maxRows={3}
            placeholder="채팅란"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              fontSize: "small",
            }}
            value={chatContent}
            onChange={handleInputChat}
            onKeyUp={handlePressEnter}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
          >
            <Send onClick={handleSendMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
