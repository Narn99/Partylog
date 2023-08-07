import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Grid } from "@mui/material";

const CountdownTimer = (props) => {
  const {
    userBirthday,
    // 추후 생일데이터 받아서 하는거
  } = props;

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

  // const userBirthday = "2023-08-07T00:00";

  useEffect(() => {
    if (targetTime) {
      const [hours, minutes] = targetTime.split(":");
      const newDate = new Date(userBirthday);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setTimeLeft(calculateTimeLeft(newDate));
    }
  }, [targetTime, userBirthday]);

  const calculateTimeLeft = (targetDate) => {
    const currentDate = new Date();
    let diff = +targetDate - +currentDate;
    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    } else {
      // 오늘이 지난 경우
      const nextYearBirthday = new Date(targetDate);
      nextYearBirthday.setFullYear(currentDate.getFullYear() + 1);
      diff = +nextYearBirthday - +currentDate;

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
  }, [timeLeft, targetTime, userBirthday]);

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
          {timeLeft.days !== 0 && `${timeLeft.days}일`}
          {timeLeft.days < 1 && (
            <span>
              {timeLeft.hours !== 0 && `${timeLeft.hours}시간`}{" "}
              {timeLeft.minutes !== 0 && `${timeLeft.minutes}분`}{" "}
              {timeLeft.seconds !== 0 &&
                `${timeLeft.seconds}
          초`}
            </span>
          )}
          <br />
        </div>
      </Grid>
    </Grid>
  );
};

export default CountdownTimer;
