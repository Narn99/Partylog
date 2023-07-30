import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ModalText from "./ModalText";
import { Button } from "@mui/material";

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

function MessageModal(props) {
  const {
    modalOpen,
    handleModalClose,
    modalTitle,
    modalDescription,
    setModalTitle,
    setModalDescription,
    onChangeModalText,
    randomStickyNote,
  } = props;

  // 제출 버튼 클릭 시, 내용 비우기 + 모달창 닫기

  const handleSubmitModalText = () => {
    onChangeModalText("", "");
    handleModalClose();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalOpen && (
          <Grid container>
            {randomStickyNote}
            {/* <RandomStickyNote
              Grid
              item
              xs={4}
              // style={{ width: "100%", height: "100%" }}
            ></RandomStickyNote> */}
          </Grid>
        )}
        <ModalText
          modalTitle={modalTitle}
          modalDescription={modalDescription}
          setModalTitle={setModalTitle}
          setModalDescription={setModalDescription}
          onChangeModalText={onChangeModalText}
        />
        <Grid item container justifyContent={"center"}>
          <Button
            className="MyPage-message-button"
            type="submit"
            onClick={handleSubmitModalText}
            style={{
              cursor: "pointer",
              backgroundColor: "#fbb3c2",
              color: "white",
              fontFamily: "MaplestoryOTFBold",
              width: "120px",
              fontSize: "25px",
              borderRadius: "50px",
              marginTop: "20px",
              padding: "10px",
            }}
          >
            보내기
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default MessageModal;
