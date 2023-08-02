import React from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import MusicOffRoundedIcon from "@mui/icons-material/MusicOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";

function ButtonGroup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFD9DF",
        border: "10px solid #9A4058",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MicRoundedIcon sx={{ fontSize: 50 }} />
      <MicOffRoundedIcon sx={{ fontSize: 50 }} />
      <CelebrationRoundedIcon sx={{ fontSize: 50 }} />
      <EmojiEmotionsRoundedIcon sx={{ fontSize: 50 }} />
      <VideocamRoundedIcon sx={{ fontSize: 50 }} />
      <VideocamOffRoundedIcon sx={{ fontSize: 50 }} />
      <MusicNoteRoundedIcon sx={{ fontSize: 50 }} />
      <MusicOffRoundedIcon sx={{ fontSize: 50 }} />
      <VolumeUpRoundedIcon sx={{ fontSize: 50 }} />
      <VolumeOffRoundedIcon sx={{ fontSize: 50 }} />
      <CakeRoundedIcon sx={{ fontSize: 50 }} />
      <h1>👏</h1>
    </div>
  );
}

export default ButtonGroup;
