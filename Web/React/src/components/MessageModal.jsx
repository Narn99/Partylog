import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";
import ModalText from "./ModalText";
import { Button } from "@mui/material";

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

function MessageModal({ modalOpen, handleModalClose }) {
  const RandomStickyNote = getRandomStickyNote();
  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          <RandomStickyNote
            Grid
            item
            xs={4}
            // style={{ width: "100%", height: "100%" }}
          ></RandomStickyNote>
        </Grid>
        <ModalText />
        <Grid item container justifyContent={"center"}>
          <Button
            className="MyPage-message-button"
            type="submit"
            style={{
              cursor: "pointer",
              backgroundColor: "#fbb3c2",
              color: "white",
              fontFamily: "MaplestoryOTFLight",
              fontSize: "20px",
              borderRadius: "50px",
              marginTop: "20px",
              padding: "10px",
            }}
          >
            보낼게
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default MessageModal;
