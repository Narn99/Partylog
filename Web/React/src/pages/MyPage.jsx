import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "../css/MyPage.css";
import "../components/Timmer";
import CountdownTimer from "../components/Timmer";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";
import YearChip from "../components/YearChip";
// import board from "../assets/board.png"
import MessageBoard from "../components/MessageBoard";
import MessageModal from "../components/MessageModal";

function MyPage(props) {
  const [targetDateTime, setTargetDateTime] = useState("2024-01-01T00:00");

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleChange = (event) => {
    setTargetDateTime(event.target.value);
  };

  return (
    <div className="">
      <div className="MyPage-header">
        <h1 className="loginpage-h1">Partylog</h1>
        <SearchFriend />
        <img src={molru} alt="settingimg" className="MyPage-settingimg" />
      </div>

      <div className="MyPage">
        <div className="MyPage-profile">
          <Link to="/profile-setting">
            {" "}
            {/* ProfileSetting 컴포넌트로 이동하는 Link */}
            <img src={molru} alt="profileimg" className="MyPage-profileimg" />
          </Link>
          <p className="MyPage-nickname">몰?루</p>
          <p className="MyPage-follow">팔로잉|팔로워</p>

          <input
            type="datetime-local"
            value={targetDateTime}
            onChange={handleChange}
          />
          <CountdownTimer targetDateTime={targetDateTime} />

          <button className="MyPage-live-button" style={{ cursor: "pointer" }}>
            라이브로
            <br />
            이동
          </button>
        </div>
        <div>
          <div className="MyPage-side">
            <YearChip />
            <Button
              className="MyPage-message-button"
              onClick={handleModalOpen}
              style={{
                cursor: "pointer",
                backgroundColor: "#fbb3c2",
                color: "white",
                fontFamily: "MaplestoryOTFBold",
                borderRadius: "50px",
              }}
            >
              메시지 작성
            </Button>
          </div>
          <MessageModal
            modalOpen={modalOpen}
            handleModalClose={handleModalClose}
          />

          <MessageBoard />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
