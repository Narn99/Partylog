import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFollow } from "../context/FollowContext";
import axios from "axios";

export default function SearchFriend() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");

  // 검색어가 변경될 때마다 결과 업데이트
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
  // 서버에서 유저넘버랑 닉네임을 함께 넘겨줘서 사용가능
    try {
      const response = await axios.get(`${SERVER_API_URL}/user/searchUser/${e.target.value}/10/0`, { 
        headers: {
          'Authorization': `${accessToken}`
        }
      });
      // console.log(response.data);
      setSearchResults(response.data.data); // 응답 형식이 맞는지 확인하고 필요하면 수정
    } catch (error) {
      console.error("An error occurred while fetching the data", error);
    }
    
  };

  // 팔로우 버튼 클릭 처리
  const { followings, setFollowings } = useFollow();

  const handleFollow = async (nickname, user_no) => {
    if (!followings.includes(nickname)) {
      setFollowings(prevFollowing => [...prevFollowing, nickname]);
  
      // userNo를 로컬 스토리지에서 가져옵니다.
      const userNo = localStorage.getItem("userNo");
      const accessToken = localStorage.getItem("access-token");

      try {
        await axios.post(`${SERVER_API_URL}/user/addFollow/${user_no}`, 
  { followeeNo: userNo }, 
  { 
    headers: {
      'Authorization': `${accessToken}`,
    }
  }
);

      } catch (error) {
        console.error("An error occurred while adding the follow", error);
      }
    }
  };

  return (
    <div>
      <Autocomplete
        options={searchResults}
        getOptionLabel={(option) => option.user_nickname}
        fullWidth // 전체 너비 차지
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="친구 검색"
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            fullWidth // 전체 너비 차지
            style={{ fontFamily: "MaplestoryOTFLight" }}
          />
        )}
       renderOption={(props, option) => (
  <li {...props}>
    {option.user_nickname}
    <Button variant={followings.includes(option.user_nickname) ? 'text' : 'outlined'}
     onClick={() => handleFollow(option.user_nickname, option.user_no)}>
    {followings.includes(option.user_nickname) ? '팔로우됨' : '팔로우'}
    </Button>
  </li>
)}
      />
    </div>
  );
}
