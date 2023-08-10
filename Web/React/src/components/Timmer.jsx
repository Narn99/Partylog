import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Grid } from "@mui/material";

const CountdownTimer = (props) => {
  const { userBirthday } = props;

  const [targetTime, setTargetTime] = useState("00:00");
  const [leftBirthdayTime, setLeftBirthdayTime] = useState(
    new Date(userBirthday)
  );

  const handleTimeChange = (event) => {
    const selectedTime = event.$d;
    console.log(selectedTime);
    console.log(event);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();

    const newLeftBirthdayTime = new Date(leftBirthdayTime);
    newLeftBirthdayTime.setHours(hours);
    newLeftBirthdayTime.setMinutes(minutes);

    setTargetTime(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
    setLeftBirthdayTime(newLeftBirthdayTime);
  };

  const calculateTimeLeft = (targetDate) => {
    const currentDate = new Date();

    // 현재 연도로 사용자의 생일 설정
    targetDate.setFullYear(currentDate.getFullYear());

    let diff = +targetDate - +currentDate;
    let timeLeft = {};

    if (diff <= 0) {
      // 이미 올해의 생일이 지났다면, 다음 해의 생일로 설정
      targetDate.setFullYear(currentDate.getFullYear() + 1);
      diff = +targetDate - +currentDate;
    }

    timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(userBirthday))
  );

  useEffect(() => {
    const [hours, minutes] = targetTime.split(":");
    const newDate = new Date(userBirthday);
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    setTimeLeft(calculateTimeLeft(newDate));
  }, [targetTime, userBirthday]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(leftBirthdayTime)));
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, targetTime, leftBirthdayTime]);

  // console.log(targetTime);
  // console.log(timeLeft);
  // 여기의 timeLeft가 남은 시간인데, useState로 관리하니까 남한테 안 보임.... 남들한테도 보낼 수 있게

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
              {timeLeft.seconds !== 0 && `${timeLeft.seconds}초`}
            </span>
          )}
          <br />
        </div>
      </Grid>
    </Grid>
  );
};

export default CountdownTimer;
