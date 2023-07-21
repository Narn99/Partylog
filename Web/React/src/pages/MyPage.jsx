import React, { useState } from "react";
import "../css/MyPage.css";
import "../components/Timmer"
import CountdownTimer from "../components/Timmer";
import SearchFriend from "../components/SearchFriend";


function MyPage(props) {
  const [targetDateTime, setTargetDateTime] = useState("2024-01-01T00:00");

  const handleChange = (event) => {
    setTargetDateTime(event.target.value);
  };

  return (
    <div className="">
      <h1 className="loginpage-h1">Partylog</h1>
      <SearchFriend />
      <input type="datetime-local" value={targetDateTime} onChange={handleChange} />
      <CountdownTimer targetDateTime={targetDateTime} />
    </div>
  );
}

export default MyPage;
