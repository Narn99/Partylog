import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid } from "@mui/material";

function UserFollowButton(props) {
  const {
    // pageOwner,
    myUserNo,
    userNo,
    accessToken,
    SERVER_API_URL,
    changeFollowButtonFontSize,
    changeLiveButtonWidth,
  } = props;

  const [isFollowed, setIsFollowed] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnterToCancel = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveToCancel = () => {
    setIsHovered(false);
  };

  // 이거 바꿔야됨..
  useEffect(() => {
    axios({
      method: "post",
      url: `${SERVER_API_URL}/user/searchFolloweeList`,
      headers: {
        Authorization: accessToken,
      },
      data: {
        followerNo: userNo,
        followeeNo: myUserNo,
        limit: 5,
        offset: 0,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUserFollow = () => {};
  const handleCancelUserFollow = () => {};

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      {isFollowed ? (
        <Button
          className="following-button"
          onClick={handleCancelUserFollow}
          onMouseEnter={handleMouseEnterToCancel} // 마우스가 위에 올라갈 때
          onMouseLeave={handleMouseLeaveToCancel} // 마우스가 벗어날 때
          variant="contained"
          color={isHovered ? "error" : "primary"}
          style={{
            fontFamily: "MaplestoryOTFBold",
            fontSize: changeFollowButtonFontSize,
            color: isHovered ? "white" : "#535353",
            backgroundColor: isHovered ? "" : "#ffffff",
            width: changeLiveButtonWidth,
            borderRadius: "40px",
            textShadow: isHovered
              ? "0.1px 0.1px 4px #e892a4"
              : "0.5px 0.5px 30px #e892a4",
            boxSizing: "border-box",
          }}
        >
          {isHovered ? <span>팔로우 해제</span> : <span>팔로잉</span>}
        </Button>
      ) : (
        <Button
          className="follow-button"
          onClick={handleUserFollow}
          variant="contained"
          // color="primary"
          style={{
            fontFamily: "MaplestoryOTFBold",
            fontSize: changeFollowButtonFontSize,
            width: changeLiveButtonWidth,
            color: "white",
            borderRadius: "40px",
            textShadow: "0.1px 0.1px 4px #e892a4",
            boxSizing: "border-box",
          }}
        >
          팔로우
        </Button>
      )}
    </Grid>
  );
}

export default UserFollowButton;
