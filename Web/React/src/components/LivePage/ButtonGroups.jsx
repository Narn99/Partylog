import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, {
  // useCallback,
  useEffect,
  useState,
} from "react";
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

// import { firework3 } from "../firework3";

// 일단 쓸지도 모르는 아이콘들 모아온 것

function ButtonGroups(props) {
  const {
    publisher,
    showFirework,
    //  setShowFirework,
    handleFirework,
  } = props;

  const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeIconSize = isSmallScreen ? "35px" : "45px";
  const changeEmojiSize = isSmallScreen ? "25px" : "35px";

  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isVolumeOn, setIsVolumeOn] = useState(false);

  // const [showFirework, setShowFirework] = useState(false);

  const handleMicToggle = () => {
    publisher.publishAudio(isMicOn);
    setIsMicOn(!isMicOn);
  };
  const handleCamToggle = () => {
    publisher.publishVideo(isCamOn);
    setIsCamOn(!isCamOn);
  };
  const handleMusicToggle = () => {
    setIsMusicOn(!isMusicOn);
  };
  const handleVolumeToggle = () => {
    setIsVolumeOn(!isVolumeOn);
  };

  // const handleFirework = () => {
  //   setShowFirework(true);
  //   setTimeout(() => {
  //     setShowFirework(false);
  //   }, 3500);
  // };

  // useEffect(() => {
  //   if (showFirework) {
  //     firework3();
  //   }
  // }, [showFirework]);

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
      <Grid
        container
        justifyContent={"space-evenly"}
        alignItems={"center"}
        style={{
          margin: "5px",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <Grid item>
          {isMicOn ? (
            <MicOffRoundedIcon
              sx={{ fontSize: `${changeIconSize}`, margin: "5px" }}
              onClick={handleMicToggle}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MicRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleMicToggle}
              style={{ cursor: "pointer" }}
            />
          )}
        </Grid>
        <Grid item>
          {isCamOn ? (
            <VideocamOffRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleCamToggle}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <VideocamRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleCamToggle}
              style={{ cursor: "pointer" }}
            />
          )}
        </Grid>
        <Grid item>
          {isMusicOn ? (
            <MusicOffRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleMusicToggle}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MusicNoteRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleMusicToggle}
              style={{ cursor: "pointer" }}
            />
          )}
        </Grid>
        <Grid item>
          {isVolumeOn ? (
            <VolumeOffRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleVolumeToggle}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <VolumeUpRoundedIcon
              sx={{ fontSize: `${changeIconSize}` }}
              onClick={handleVolumeToggle}
              style={{ cursor: "pointer" }}
            />
          )}
        </Grid>
        <Grid item>
          <CelebrationRoundedIcon
            sx={{
              fontSize: `${changeIconSize}`,
              cursor: showFirework ? "wait" : "pointer",
            }}
            onClick={handleFirework}
          />
        </Grid>
        <Grid item>
          <EmojiEmotionsRoundedIcon sx={{ fontSize: `${changeIconSize}` }} />
        </Grid>
        <Grid item>
          <CakeRoundedIcon sx={{ fontSize: `${changeIconSize}` }} />
        </Grid>
        <Grid item>
          <span style={{ fontSize: `${changeEmojiSize}` }}>👏</span>
        </Grid>
      </Grid>
    </div>
  );
}

export default ButtonGroups;
