import React, { useState, useEffect, useCallback } from "react";
import MessageOnBoard from "./MessageOnBoard";
import Board from "../assets/Frame_21.png";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

function MessageBoard() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [carouselPages, setCarouselPages] = useState([]);
  const [carouselPageMessages, setCarouselPageMessages] = useState([]);

  const messages = useSelector((state) => {
    return state.messagesData.messages;
  });

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          <Slider {...settings}>
            {carouselPages.map((pageIndex) => (
              <div key={pageIndex} style={{ width: "100%", height: "100%" }}>
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  spacing={1}
                >
                  {carouselPageMessages[pageIndex].map((user) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      lg={3}
                      key={`MessageOnBoard-${user.userNo}`}
                      style={{
                        position: "relative",
                        width: "90%",
                        height: "90%",
                        objectFit: "fill",
                        minHeight: "170px",
                        marginTop: "30px",
                      }}
                    >
                      <MessageOnBoard user={user} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;
