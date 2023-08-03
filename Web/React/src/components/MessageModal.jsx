import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ModalText from "./ModalText";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalData,
  resetModalData,
  addMessageData,
  deleteMessageData,
} from "../actions/actions";

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
  const { modalOpen, handleModalClose, randomStickyNote } = props;

  const modalTitle = useSelector((state) => state.modalData.modalTitle);
  const modalDescription = useSelector(
    (state) => state.modalData.modalDescription
  );

  const dispatch = useDispatch();

  const handleChangeModalText = (modalTitleText, modalDescriptionText) => {
    dispatch(setModalData(modalTitleText, modalDescriptionText));
  };

  // 제출 버튼 클릭 시, 내용 비우기 + 모달창 닫기

  const handleSubmitModalText = () => {
    if (modalTitle.length === 0 || modalDescription.length === 0) {
      alert("메시지를 작성해주세요!");
    } else {
      handleModalClose();
      dispatch(addMessageData(modalTitle, modalDescription));
      dispatch(resetModalData());
    }
  };

  // 내용 초기화 버튼 만들기?

  const handleResetModalText = () => {
    dispatch(resetModalData());
  };

  // 메시지 삭제용 버튼. 메시지 userNo가 본인거랑 같다면 보이고, 삭제도 가능하게 수정해야됨.
  // 일단 임시로 마지막 메시지가 삭제되게 해둠.

  const userNo = useSelector((state) => state.messagesData.messages).length;

  const handleDeleteMessage = () => {
    // if (modalUserNo === 1) {
    dispatch(deleteMessageData(userNo));
    handleModalClose();
    // } else {
    //   alert("메시지 작성자 본인이 아닙니다!");
    // }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalOpen && <Grid container>{randomStickyNote}</Grid>}
        <ModalText
          modalTitle={modalTitle}
          modalDescription={modalDescription}
          onChangeModalText={handleChangeModalText}
        />
        <Grid item container justifyContent={"center"}>
          <Button
            className="MyPage-message-submit-button"
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

          {/* 일단 메시지 삭제랑 초기화용 버튼 */}
          <Button
            className="MyPage-message-delete-button"
            type="submit"
            onClick={handleDeleteMessage}
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
            삭제
          </Button>
          <Button
            className="MyPage-message-reset-button"
            type="submit"
            onClick={handleResetModalText}
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
            초기화
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default MessageModal;
