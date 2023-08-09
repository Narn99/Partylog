import React, { useState, useEffect, useCallback } from "react";
import MessageOnBoard from "./MessageOnBoard";
import Board from "../assets/Frame_21.png";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";
import MessageDetail from "./MessageDetail";
import axios from "axios";

// 메시지 상세 확인할 때, 랜덤 포스트잇 출력용

const stickyNotes = [
  StickyNoteY,
  StickyNoteG,
  StickyNoteO,
  StickyNotePink,
  StickyNotePurple,
];

const getRandomStickyNote = () => {
  const randomIndex = Math.floor(Math.random() * stickyNotes.length);
  return stickyNotes[randomIndex];
};

function MessageBoard(props) {
  const { userNo, myUserNo } = props;
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // 메시지보드 캐러셀

  const [carouselPages, setCarouselPages] = useState([]);
  const [carouselPageMessages, setCarouselPageMessages] = useState([]);
  const [messagesOffset, setMessagesOffset] = useState(0);
  const [messageIsAll, setMessageIsAll] = useState(false);
  const [carouselClick, setCarouselClick] = useState(0);

  const messages = useSelector((state) => {
    return state.messagesData.messages;
  });

  // console.log(messages);

  const updateCarouselMessages = useCallback(() => {
    const messagesPerPage = isSmallScreen ? 4 : isLargeScreen ? 6 : 8;
    const carouselPage = Math.ceil(messages.length / messagesPerPage);
    const carouselPages =
      carouselPage < 1
        ? [0]
        : Array.from({ length: carouselPage }, (_, i) => i);

    const updatedCarouselPageMessages = carouselPages.map((pageIndex) => {
      const startIndex = pageIndex * messagesPerPage;
      const endIndex = Math.min(startIndex + messagesPerPage, messages.length);
      return messages.slice(startIndex, endIndex);
    });

    setCarouselPages(carouselPages);
    setCarouselPageMessages(updatedCarouselPageMessages);
  }, [isSmallScreen, isLargeScreen, messages]);

  useEffect(() => {
    updateCarouselMessages();
  }, [updateCarouselMessages]);

  // 버튼을 누르면 다음 메시지 목록 불러오기 로직
  // 아마 버튼 누를 때마다 새 메시지 데이터 가져오게 하면, 계속 새로 렌더링되지 않을까?

  const handleClickPageButton = () => {
    setCarouselClick(carouselClick + 1);

    if (carouselClick >= 1) {
      if (!messageIsAll) {
        setMessagesOffset(messagesOffset + 24);

        axios({
          method: "post",
          url: `${SERVER_API_URL}/letter/get/letters`,
          headers: {
            Authorization: `${accessToken}`,
          },
          data: {
            receiverNo: userNo,
            writerNo: myUserNo,
            year: 0,
            limit: 24,
            offset: messagesOffset,
          },
        })
          .then((res) => {
            console.log(res.data.data);
          })
          .catch((err) => console.log(err));
      }
      setCarouselClick(0);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  // 메시지 선택 시, 해당 모달 창이 열리며 해당 메시지 출력

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const handleModalDetailOpen = (message) => {
    setSelectedMessage(message);
    setModalDetailOpen(true);
    setRandomStickyNote(getRandomStickyNote());
  };
  const handleModalDetailClose = () => setModalDetailOpen(false);

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#a27e4f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "40px",
      }}
    >
      <div
        style={{
          width: "94%",
          height: "91%",
          backgroundImage: `url(${Board})`,
          borderRadius: "30px",
          objectFit: "fill",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "95%", height: "95%" }}>
          {messages.length === 0 ? (
            // messages 배열이 비어있을 때, "아직 메시지가 없네요..." 문장 출력
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                fontSize: "40px",
                fontFamily: "MaplestoryOTFBold",
                color: "white",
                textShadow: "2px 2px 10px grey",
              }}
            >
              아직 메시지가 없네요...
            </div>
          ) : (
            <Slider {...settings} beforeChange={handleClickPageButton}>
              {carouselPages.map((pageIndex) => (
                <div key={pageIndex} style={{ width: "100%", height: "100%" }}>
                  <Grid
                    container
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    {carouselPageMessages[pageIndex].map((message) => (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        lg={3}
                        key={`MessageOnBoard-${message.letter_id}`}
                        style={{
                          position: "relative",
                          width: "90%",
                          height: "90%",
                          objectFit: "fill",
                          minHeight: "170px",
                          marginTop: "30px",
                        }}
                      >
                        <MessageOnBoard
                          message={message}
                          onClick={() => handleModalDetailOpen(message)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      <MessageDetail
        modalDetailOpen={modalDetailOpen}
        handleModalDetailClose={handleModalDetailClose}
        randomStickyNote={randomStickyNote}
        selectedMessage={selectedMessage}
      />
    </div>
  );
}

export default MessageBoard;
