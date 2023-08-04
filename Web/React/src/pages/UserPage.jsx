import React, { useState, memo, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import "../css/UserPage.css";
import "../components/Timmer";
import CountdownTimer from "../components/Timmer";
import molru from "../assets/molru.webp";
import YearChip from "../components/YearChip";
import MessageModal from "../components/MessageModal";
import NavBar from "../components/NavBar";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";
import MessageBoard from "../components/MessageBoard";
import axios from "axios";

// 모달창을 열 때마다 StickyNote가 바뀌게 설정

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

function UserPage() {
  const { userNo } = useParams();

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const [userInfo, setUserInfo] = useState({});
  const [recievedMessages, setRecivedMessages] = useState([]);
  const [followerCount, setFollowerCount] = useState("");
  const [followeeCount, setFolloweeCount] = useState("");

  useEffect(() => {
    axios
      .get(`${SERVER_API_URL}/user/${userNo}/`)
      .then((res) => {
        console.log(res.status);
        console.log(res.message);
        const data = res.data;
        setUserInfo({
          userNo: data.userNo,
          userNickname: data.userNickname,
          userBirthday: data.userBirthday,
          useProfile: data.userProfile,
        });
        setRecivedMessages(data.letterResponseBody);
        setFolloweeCount(data.followeeSum);
        setFollowerCount(data.followerSum);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const navigate = useNavigate();
  const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //
  // props로 위의 화면 크기에 대한 값을 하위 컴포넌트에 전달해서 크기 바뀌게 하기 가능
  // 해당 크기를 경곗값으로 하여 삼항연산으로 작성하면 breaking point 기준으로 바뀌게 할 수 있음

  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  const MemoizedMessageBoard = memo(MessageBoard);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
    setRandomStickyNote(getRandomStickyNote());
  };
  const handleModalClose = () => setModalOpen(false);

  const [targetDateTime, setTargetDateTime] = useState("2024-01-01T00:00");

  const handleChange = (event) => {
    setTargetDateTime(event.target.value);
  };

  // const navigate = useNavigate();

  const handleLiveButtonClick = (event) => {
    window.open(`/live/${userNo}`, "_blank");
  };

  const handleToProfileSetting = (event) => {
    navigate("/profile-setting");
  };

  const changeProfileImgSize = isSmallScreen ? "200px" : "100%";
  const changeLiveButtonFontSize = isSmallScreen ? "18px" : "25px";
  const changeMessageButtonFontSize = isSmallScreen ? "15px" : "20px";
  const addMarginAboveBoard = isMediumScreen ? "20px" : "";

  return (
    <div className="UserPageBody">
      <NavBar />
      <Grid container spacing={1} className="UserPage">
        <Grid container item xs={12} md={4} justifyContent={"center"}>
          <div>
            <Grid
              container
              direction="column"
              className="UserPage-profile"
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Grid item container justifyContent={"center"}>
                <Grid
                  container
                  item
                  justifyContent={"center"}
                  alignItems={"center"}
                  sm={11}
                >
                  <img
                    src={molru}
                    alt="profileimg"
                    className="UserPage-profileimg"
                    style={{
                      width: changeProfileImgSize,
                      maxWidth: "320px",
                      height: changeProfileImgSize,
                      maxHeight: "320px",
                    }}
                    onClick={handleToProfileSetting}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <p className="UserPage-nickname">몰?루 #{userNo}</p>
                {/* <p className="UserPage-nickname">
                  {userInfo.userNickname} #{userInfo.userNo}
                </p> */}
              </Grid>
              <Grid item>
                <Link to="/myfriend" className="myLink">
                  <p className="UserPage-follow">
                    팔로잉 {followeeCount} &nbsp;|&nbsp; 팔로워 {followerCount}
                  </p>
                </Link>
              </Grid>

              <Grid item>
                <input
                  type="datetime-local"
                  value={targetDateTime}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <CountdownTimer targetDateTime={targetDateTime} />
              </Grid>
              <Grid item>
                <Button
                  className="live-button"
                  onClick={handleLiveButtonClick}
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    fontSize: changeLiveButtonFontSize,
                    color: "white",
                    width: "180px",
                    height: "75px",
                    lineHeight: "35px",
                    borderRadius: "40px",
                    texShadow: "0.1px 0.1px 4px #e892a4",
                    marginTop: "20px",
                  }}
                >
                  라이브로
                  <br />
                  이동
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12} md={7} style={{ marginTop: addMarginAboveBoard }}>
          <div>
            <Grid container item xs={12}>
              <div
                className="UserPage-side"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div className="yearchips-div">
                    <YearChip />
                  </div>
                </Grid>
                <Grid
                  container
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <div className="create-message-div">
                    {/* 추후에 메시지 이미 작성한 본인은 메시지 작성 버튼 대신에 수정 버튼이 보이게 수정,
                    수정을 누르면 본인이 작성했던 메시지 내용이 뜨게 하고,그 안에 메시지 삭제 버튼도 존재하게 */}
                    <Button
                      className="fix-message-button"
                      onClick={handleModalOpen}
                      variant="contained"
                      style={{
                        fontFamily: "MaplestoryOTFBold",
                        fontSize: changeMessageButtonFontSize,
                        color: "white",
                        borderRadius: "40px",
                        texShadow: "0.1px 0.1px 4px #e892a4",
                        boxSizing: "border-box",
                      }}
                    >
                      메시지 수정
                    </Button>
                    <Button
                      className="create-message-button"
                      onClick={handleModalOpen}
                      variant="contained"
                      style={{
                        fontFamily: "MaplestoryOTFBold",
                        fontSize: changeMessageButtonFontSize,
                        color: "white",
                        borderRadius: "40px",
                        texShadow: "0.1px 0.1px 4px #e892a4",
                        boxSizing: "border-box",
                      }}
                    >
                      메시지 작성
                    </Button>
                  </div>
                </Grid>
              </div>
            </Grid>

            <Grid container item xs={12}>
              <MemoizedMessageBoard />
            </Grid>
          </div>
        </Grid>
        <Grid item lg={1}>
          <div></div>
        </Grid>
      </Grid>
      <MessageModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        randomStickyNote={randomStickyNote}
        isMediumScreen={isMediumScreen}
        // onSubmitText={handleSubmitModalText}
      />
    </div>
  );
}

export default UserPage;
