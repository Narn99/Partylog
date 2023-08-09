import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid, createTheme, useMediaQuery } from "@mui/material";
import MessageDetailText from "./MessageDetailText";

// MessageModal 컴포넌트와 비슷한 구조

function MessageDetail(props) {
  const {
    modalDetailOpen,
    handleModalDetailClose,
    randomStickyNote,
    selectedMessage,
  } = props;

  const theme = createTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const modalHeight = isSmallScreen
    ? "70%"
    : isMediumScreen
    ? "60%"
    : isLargeScreen
    ? "50%"
    : "40%";

  const changeModalDetailVerticalPosition = isMediumScreen
    ? "40%"
    : isLargeScreen
    ? "30%"
    : "27%";

  const style = {
    position: "fixed",
    top: "27%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalHeight,
    height: "30%",
    minWidth: "300px",
    minHeight: "300px",
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
  };

  return (
    <Modal
      open={modalDetailOpen}
      onClose={handleModalDetailClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, top: changeModalDetailVerticalPosition }}>
        {modalDetailOpen && <Grid container>{randomStickyNote}</Grid>}
        <MessageDetailText
          detailMessage={selectedMessage}
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
          isSmallScreen={isSmallScreen}
        />
      </Box>
    </Modal>
  );
}

export default MessageDetail;
