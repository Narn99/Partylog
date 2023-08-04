import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import { Grid, createTheme, useMediaQuery } from "@mui/material";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  marginTop: "20px",
};

function ModalText(props) {
  const theme = createTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const titleMargin = isSmallScreen
    ? "10px"
    : isMediumScreen
    ? "20px"
    : isLargeScreen
    ? "30px"
    : "40px";

  const detailMessage = props.detailMessage;

  // 일단 CSS 신경 안 쓰고 모달에 띄우는 것만 구현해둔 것이니 나중에 CSS 수정할 것.

  return (
    <div style={style}>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          {" "}
          <Grid
            container
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              item
              container
              xs={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img
                src={detailMessage.profile}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              />{" "}
            </Grid>
            <Grid
              item
              xs={10}
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                textAlign: "start",
              }}
            >
              &nbsp;&nbsp;&nbsp;
              {detailMessage.nickname}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <Typography id="modal-modal-title" variant="h3">
            제목
          </Typography>
        </Grid>
        <Grid container item xs={12} marginBottom={titleMargin}>
          <p>{detailMessage.letterTitle}</p>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h3">
            내용
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <p>{detailMessage.letterContent}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(ModalText);
