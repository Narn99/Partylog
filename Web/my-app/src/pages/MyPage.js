import React, { useEffect } from "react";
import axios from "axios";

function MyPage(props) {
    useEffect(() => {
        console.log("내 정보 불러오기");
        const userNo = 1013;
        const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDEzIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsInJvbGVzIjoidXNlciIsImlhdCI6MTY5MDE3NzI0MSwiZXhwIjoxNjkwMTc5MDQxfQ.eDTA6C2Es_eXvFxZv0YWc16BpLFZUlDY-APhyvf21hU"
        const refreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDEzIiwidHlwZSI6InJlZnJlc2hfdG9rZW4iLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2OTAxNjQwMTAsImV4cCI6MTY5MTM3MzYxMH0.5G23J05EXDR3wj_4PDhCxLOcD9799bG7K3YUDGTIYmM"
        axios.defaults.headers.common['Authorization'] = `${accessToken}`
        axios.post(
            `http://localhost:8080/partylog/user/mypage/${userNo}`
            )
            .then((res) => {
                console.log(res)
            })

        // eslint-disable-next-line
      }, []);

      const getMyInfo = () => {

      }

    return (
        <div>
            <h1>마이 페이지입니다</h1>
            <h2>{`나중에 필요한 기능이 추가될 수도 있습니다`}</h2>
        </div>
    );
}

export default MyPage;