import React, { useState } from "react";
import "../css/MyPage.css";
import "../components/Timmer"
import CountdownTimer from "../components/Timmer";

function MyPage(props) {
    const [targetDate, setTargetDate] = useState("2024-01-01");

  const handleChange = (event) => {
    setTargetDate(event.target.value);
  };
    return (
        <div className="test">
            <h1 className="loginpage-h1">Partylog</h1>
            <input type="date" value={targetDate} onChange={handleChange} />
            <CountdownTimer targetDate={targetDate} />
            
        </div>
    );
}

export default MyPage;
