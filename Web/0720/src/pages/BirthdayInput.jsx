import React from "react";
import Cake from "../image/Cake.png";
import "../css/BirthdayInput.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function BirthdayInput(props) {
    return (
        <div className="center">
            <h1 className="loginpage-h1">Partylog</h1>
            
            <h2 style={{ fontFamily: 'HakgyoansimWoojuR'}}>서비스 이용을 위해 생일을 입력해주세요!</h2>
            <h3>(가입시 한번만 입력합니다)</h3>
            <img 
            src={Cake}
            alt="Birthday Cake!!"
            className="cake-image"
          />
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
          </LocalizationProvider>
          <button style={{ fontFamily: 'HakgyoansimWoojuR' }}
            className="submit-button"
          >
            제출
          </button>
         
        </div>
    );
}

export default BirthdayInput;
