import React, { useState } from "react";
import "../css/MyPage.css";
import "../components/Timmer"
import CountdownTimer from "../components/Timmer";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp"

function MyPage(props) {
  const [targetDateTime, setTargetDateTime] = useState("2024-01-01T00:00");

  const handleChange = (event) => {
    setTargetDateTime(event.target.value);
  };

  return (
    <div className="MyPage">
      <div className="MyPage-header">
        <h1 className="loginpage-h1">Partylog</h1>
        <SearchFriend />
        <img src={molru} alt="settingimg" className="MyPage-settingimg"/>
      </div>
      
        <div className="MyPage-content">
        
        <img src={molru} alt="profileimg" className="MyPage-profileimg"/>
        <p className="MyPage-nickname">몰루?!</p>
        <p>팔로잉|팔로워</p>
      
      <input type="datetime-local" value={targetDateTime} onChange={handleChange} />
      <CountdownTimer targetDateTime={targetDateTime} />

      <button className="MyPage-button">라이브로 이동</button>
      
      </div>
    </div>
  );
}

export default MyPage;
