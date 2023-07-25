import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, createTheme, useMediaQuery } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
// import Button from "@mui/material/Button";

const pink = {
  100: "#FFD9DF",
  200: "#FFB1C2",
  400: "#D7718B",
  500: "#B85872",
  600: "#9A4059",
  900: "#5F112C",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    width: 100%;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${pink[400]};
    }
  
    &:focus {
      border-color: ${pink[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? pink[500] : pink[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
};

function ModalText() {
  const theme = createTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const textMaxRow = isMediumScreen ? "2" : isLargeScreen ? "3" : "7";

  const titleMargin = isSmallScreen
    ? "10px"
    : isMediumScreen
    ? "20px"
    : isLargeScreen
    ? "30px"
    : "40px";

  return (
    <div style={style}>
      <Grid container>
        <Grid item xs={12}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            제목 (최대 10자)
          </Typography>
        </Grid>
        <Grid container item xs={12} marginBottom={titleMargin}>
          <StyledTextarea
            Grid
            item
            maxRows={1}
            id="modal-modal-title"
            aria-label="modal-modal-title"
            placeholder="남길 제목을 입력해주세요."
            maxLength={10}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            내용 (최대 200자)
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <StyledTextarea
            Grid
            item
            id="modal-modal-description"
            aria-label="modal-modal-description"
            minRows={2}
            maxRows={textMaxRow}
            placeholder="남길 메시지를 입력해주세요."
            variant="standard"
            maxLength={200}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ModalText;
