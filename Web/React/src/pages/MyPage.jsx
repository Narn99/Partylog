import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "../css/MyPage.css";
import "../components/Timmer";
import CountdownTimer from "../components/Timmer";
import molru from "../assets/molru.webp";
import YearChip from "../components/YearChip";
// import MessageBoard from "../components/MessageBoard";
import MessageModal from "../components/MessageModal";
import Grid from "@mui/material/Grid";
import NavBar from "../components/NavBar";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";

// 창을 열 때마다 StickyNote가 바뀌게 설정

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

function MyPage() {
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  // 제출 버튼을 누르거나 페이지를 벗어나지 않는 한, 모달을 껐다 켜도 내용이 임시저장 돼있게 설정

  const handleChangeModalText = useCallback(
    (modalTitleText, modalDescriptionText) => {
      setModalTitle(modalTitleText);
      setModalDescription(modalDescriptionText);
    },
    []
  );

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

  const handleLiveButtonClick = (event) => {
    // event.stopPropagation();
    // 이 버튼을 클릭했을 때 실행할 동작을 여기에 추가
  };

  return (
    <div className="MyPageBody">
      <NavBar />
      <Grid container spacing={1} className="MyPage" marginTop={"15px"}>
        <Grid container item xs={12} md={3} justifyContent={"center"}>
          <div>
            <Grid
              container
              direction="column"
              className="MyPage-profile"
              alignItems={"center"}
            >
              <Grid item>
                <Link to="/profile-setting">
                  {" "}
                  <img
                    src={molru}
                    alt="profileimg"
                    className="MyPage-profileimg"
                  />
                </Link>
              </Grid>
              <Grid item>
                <p className="MyPage-nickname">몰?루</p>
              </Grid>
              <Grid item>
                <Link to="/myfriend">
                <p className="MyPage-follow">팔로잉|팔로워</p>
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
                    fontSize: "25px",
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

        <Grid item xs={12} md={8}>
          <div>
            <Grid container>
              <Grid item xs={12} md={11}>
                <div
                  className="MyPage-side"
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
                      <Button
                        className="create-message-button"
                        onClick={handleModalOpen}
                        variant="contained"
                        style={{
                          fontFamily: "MaplestoryOTFBold",
                          fontSize: "20px",
                          color: "white",
                          borderRadius: "40px",
                          texShadow: "0.1px 0.1px 4px #e892a4",
                        }}
                      >
                        메시지 작성
                      </Button>
                    </div>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                {/* <MessageBoard /> */}
              </Grid>
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
        modalTitle={modalTitle}
        modalDescription={modalDescription}
        setModalTitle={setModalTitle}
        setModalDescription={setModalDescription}
        randomStickyNote={randomStickyNote}
        onChangeModalText={handleChangeModalText}
      />
    </div>
  );
}

export default MyPage;
