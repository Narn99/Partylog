import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ModalText from "./ModalText";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  setModalData,
  resetModalData,
  addMyMessageData,
  getAdditionalMessagesList,
  deleteMessageData,
} from "../actions/actions";
import axios from "axios";

const style = {
  position: "fixed",
  // top: "30%",
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
    userNo,
    myUserNo,
    // pageOwner,
    modalOpen,
    handleModalClose,
    randomStickyNote,
    isMediumScreen,
    isLargeScreen,
    myMessage,
  } = props;

  const modalTitle = useSelector((state) => state.modalData.modalTitle);
  const modalDescription = useSelector(
    (state) => state.modalData.modalDescription
  );

  const dispatch = useDispatch();

  const handleChangeModalText = (modalTitleText, modalDescriptionText) => {
    dispatch(setModalData(modalTitleText, modalDescriptionText));
  };

  // 제출 버튼 클릭 시, 내용 비우기 + 모달창 닫기
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  //  추후 로컬스토리지에서 쿠키로 변경
  const accessToken = localStorage.getItem("access-token");

  const handleSubmitModalText = () => {
    if (modalTitle.length === 0 || modalDescription.length === 0) {
      alert("메시지를 작성해주세요!");
    } else {
      axios({
        method: "post",
        url: `${SERVER_API_URL}/letter/send/`,
        headers: {
          Authorization: `${accessToken}`,
        },
        data: {
          letterTitle: modalTitle,
          letterContent: modalDescription,
          letterReceiver: userNo,
        },
      })
        .then((res) => {
          console.log(res.data);
          dispatch(addMyMessageData(res.data.data));

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
              offset: 0,
            },
          })
            .then((res) => {
              console.log(res.data.data);
              const additionalMessagesData = res.data.data;
              dispatch(getAdditionalMessagesList(additionalMessagesData));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      handleModalClose();
      dispatch(resetModalData());
    }
  };

  // 내용 초기화 버튼

  const [isConfirmReset, setIsConfirmReset] = useState(false);

  const handleRequestReset = () => {
    setIsConfirmReset(true);
  };

  const handleResetModalText = () => {
    dispatch(resetModalData());
    setIsConfirmReset(false);
  };

  const handleCancelReset = () => {
    setIsConfirmReset(false);
  };

  // 메시지 삭제용 버튼. 메시지 messageUserNo가 본인거랑 같다면 보이고, 삭제도 가능하게 수정해야됨.
  // 일단 임시로 마지막 메시지가 삭제되게 해둠.

  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const handleRequestDelete = () => {
    setIsConfirmDelete(true);
  };
  const handleCancelDelete = () => {
    setIsConfirmDelete(false);
  };

  const [messageWriterId, setMessageWriterId] = useState(null);
  const [messageId, setMessageId] = useState(null);

  useEffect(() => {
    if (myMessage) {
      setMessageWriterId(myMessage.letter_writer);
      setMessageId(myMessage.letter_id);
    }
  }, [myMessage]);

  useEffect(() => {}, [myMessage]);

  // const nowMessages = useSelector((state) => {
  //   return state.messagesData.messages;
  // });

  const handleDeleteMessage = () => {
    // console.log(myUserNo);
    // console.log(messageWriterId);
    if (parseInt(myUserNo) === parseInt(messageWriterId)) {
      console.log("goDelete");
      axios({
        method: "delete",
        url: `${SERVER_API_URL}/letter/delete/${messageId}`,
        headers: {
          Authorization: `${accessToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          setIsConfirmDelete(false);
          dispatch(deleteMessageData(myUserNo));
          dispatch(resetModalData());
          handleModalClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("메시지 작성자 본인이 아닙니다!");
    }
  };

  // console.log("메시지모달의 마이메시지");
  // console.log(myMessage);

  // myMessage가 갱신이 안 돼서 메시지 작성 버튼이 안 바뀜

  const changeModalVerticalPosition = isMediumScreen ? "50%" : "30%";
  const changeButtonFontSize = isMediumScreen ? "15px" : "25px";
  const changeButtonSize = isMediumScreen
    ? "80px"
    : isLargeScreen
    ? "120px"
    : "180px";

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box sx={style}> */}
      <Box sx={{ ...style, top: changeModalVerticalPosition }}>
        {modalOpen && <Grid container>{randomStickyNote}</Grid>}
        <ModalText
          modalTitle={modalTitle}
          modalDescription={modalDescription}
          onChangeModalText={handleChangeModalText}
        />
        <Grid container justifyContent={"space-evenly"}>
          {myMessage ? (
            <Button
              className="MyPage-message-delete-button"
              type="submit"
              onClick={handleRequestDelete}
              style={{
                cursor: "pointer",
                backgroundColor: "#fbb3c2",
                color: "white",
                fontFamily: "MaplestoryOTFBold",
                width: changeButtonSize,
                fontSize: changeButtonFontSize,
                borderRadius: "50px",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              삭제
            </Button>
          ) : (
            <Button
              className="MyPage-message-submit-button"
              type="submit"
              onClick={handleSubmitModalText}
              style={{
                cursor: "pointer",
                backgroundColor: "#fbb3c2",
                color: "white",
                fontFamily: "MaplestoryOTFBold",
                width: changeButtonSize,
                fontSize: changeButtonFontSize,
                borderRadius: "50px",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              보내기
            </Button>
          )}
          <Button
            className="MyPage-message-reset-button"
            type="submit"
            onClick={handleRequestReset}
            style={{
              cursor: "pointer",
              backgroundColor: "#fbb3c2",
              color: "white",
              fontFamily: "MaplestoryOTFBold",
              width: changeButtonSize,
              fontSize: changeButtonFontSize,
              borderRadius: "50px",
              marginTop: "20px",
              padding: "10px",
            }}
          >
            비우기
          </Button>
        </Grid>
        {isConfirmReset && (
          <Dialog open={true} onClose={handleCancelReset}>
            <DialogTitle>메시지 비우기</DialogTitle>
            <DialogContent>
              <DialogContentText>
                정말로 메시지를 비우시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResetModalText} color="primary">
                네
              </Button>
              <Button onClick={handleCancelReset} color="primary">
                아니오
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {isConfirmDelete && (
          <Dialog open={true} onClose={handleCancelDelete}>
            <DialogTitle>메시지 삭제</DialogTitle>
            <DialogContent>
              <DialogContentText>
                정말로 메시지를 삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteMessage} color="primary">
                네
              </Button>
              <Button onClick={handleCancelDelete} color="primary">
                아니오
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Modal>
  );
}

export default MessageModal;
