import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Grid } from "@mui/material";

const CountdownTimer = (props) => {
  // const {
  //   userBirthday
  //   // 추후 생일데이터 받아서 하는거
  // } = props;

  const [targetTime, setTargetTime] = useState("00:00");

  const handleTimeChange = (event) => {
    const selectedTime = event.$d;
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setTargetTime(formattedTime);
  };

  const userBirthday = "2024-01-01T00:00";

  useEffect(() => {
    if (targetTime) {
      const [hours, minutes] = targetTime.split(":");
      const newDate = new Date(userBirthday);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setTimeLeft(calculateTimeLeft(newDate));
    }
  }, [targetTime]);

  const calculateTimeLeft = (targetDate) => {
    let diff = +targetDate - +new Date();
    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(targetTime ? new Date(userBirthday) : new Date())
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, targetTime]);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Grid item style={{ marginBottom: "10px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="파티 시간을 골라주세요!"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              format="A hh:mm"
              onChange={handleTimeChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <div style={{ textAlign: "center" }}>
          생일파티까지
          <br />
          {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{" "}
          {timeLeft.seconds}초<br />
        </div>
      </Grid>
    </Grid>
  );
};

export default CountdownTimer;
