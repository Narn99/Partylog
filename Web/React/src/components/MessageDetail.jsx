import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
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

  // 임시로 선택한 메시지의 userNo와 같은 userNo의 메시지를 리덕스에서 찾아서 선언
  // 추후에는 GET_MESSAGE_DETAIL을 통해 백에서 가져오는거로 수정할 것

  const userNo = selectedMessage ? selectedMessage.userNo : null;

  const detailMessage = useSelector((state) =>
    state.messagesData.messages.find((message) => message.userNo === userNo)
  );

  return (
    <Modal
      open={modalDetailOpen}
      onClose={handleModalDetailClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalDetailOpen && <Grid container>{randomStickyNote}</Grid>}
        <MessageDetailText detailMessage={detailMessage} />
      </Box>
    </Modal>
  );
}

export default MessageDetail;
