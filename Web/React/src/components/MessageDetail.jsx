import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import MessageDetailText from "./MessageDetailText";

// MessageModal 컴포넌트와 비슷한 구조

const style = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  height: "30%",
  minWidth: "300px",
  minHeight: "300px",
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  // p: 4,
};

function MessageDetail(props) {
  const {
    modalDetailOpen,
    handleModalDetailClose,
    randomStickyNote,
    selectedMessage,
  } = props;

  return (
    <Modal
      open={modalDetailOpen}
      onClose={handleModalDetailClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalDetailOpen && <Grid container>{randomStickyNote}</Grid>}
        <MessageDetailText detailMessage={selectedMessage} />
      </Box>
    </Modal>
  );
}

export default MessageDetail;
