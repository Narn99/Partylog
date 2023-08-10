import React, { memo } from "react";
// import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";

// 화면 작아지면 폰트 및 이미지 크기 조절되도록 isScreen들 써서 바꿔야함.
// 모달창이 급격히 작아지기 때문에..

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
  const { isLargeScreen, isMediumScreen, isSmallScreen, detailMessage } = props;

  const bigFontMargin = isSmallScreen
    ? "10px"
    : isMediumScreen
    ? "12px"
    : isLargeScreen
    ? "16px"
    : "20px";

  const smallFontMargin = isSmallScreen
    ? "14px"
    : isMediumScreen
    ? "17px"
    : isLargeScreen
    ? "20px"
    : "24px";

  // const bigFontSize =
  //   detailMessage.letter_content.length > 100
  //     ? isSmallScreen
  //       ? "15px"
  //       : isMediumScreen
  //       ? "18px"
  //       : isLargeScreen
  //       ? "21px"
  //       : "25px"
  //     : isSmallScreen
  //     ? "18px"
  //     : isMediumScreen
  //     ? "22px"
  //     : isLargeScreen
  //     ? "25px"
  //     : "30px";

  const smallTitleFontSize = isSmallScreen
    ? "20px"
    : isMediumScreen
    ? "25px"
    : isLargeScreen
    ? "30px"
    : "40px";

  const smallContentFontSize =
    detailMessage.letter_content.length > 100
      ? isSmallScreen
        ? "13px"
        : isMediumScreen
        ? "15px"
        : isLargeScreen
        ? "18px"
        : "20px"
      : isSmallScreen
      ? "16px"
      : isMediumScreen
      ? "19px"
      : isLargeScreen
      ? "22px"
      : "25px";

  const navigate = useNavigate();

  const handleGoToMessageUser = () => {
    if (detailMessage.letter_writer) {
      navigate(`/user/${detailMessage.letter_writer}`);
      window.location.reload();
    }
  };

  return (
    <div style={style}>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: `${bigFontMargin}` }}>
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
                src={detailMessage.user_profile}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={handleGoToMessageUser}
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
                fontSize: "20px",
              }}
            >
              &nbsp;&nbsp;
              <span
                style={{ cursor: "pointer" }}
                onClick={handleGoToMessageUser}
              >
                {detailMessage.user_nickname}
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: `${bigFontMargin}` }}>
          {/* <Typography
            id="modal-modal-title"
            variant="h5"
            fontSize={bigFontSize}
          >
            제목
          </Typography> */}
        </Grid>
        <Grid
          container
          item
          xs={12}
          marginBottom={smallFontMargin}
          justifyContent={"center"}
        >
          <p
            style={{
              fontSize: `${smallTitleFontSize}`,
              fontFamily: "MaplestoryOTFBold",
            }}
          >
            {detailMessage.letter_title}
          </p>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: `${bigFontMargin}` }}>
          {/* <Typography
            id="modal-modal-description"
            // sx={{ mt: 2 }}
            variant="h5"
            fontSize={bigFontSize}
          >
            내용
          </Typography> */}
        </Grid>
        <Grid container item xs={12}>
          <p style={{ fontSize: `${smallContentFontSize}` }}>
            {detailMessage.letter_content}
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(ModalText);
