import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFollow } from "../context/FollowContext";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function SearchFriend() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");

  // 검색어가 변경될 때마다 결과 업데이트
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
  // 서버에서 유저넘버랑 닉네임을 함께 넘겨줘서 사용가능

   // 문자열이 비었을 때 서버 요청을 건너뛰기
   if (e.target.value.length === 0) {
    setSearchResults([]);
    return;
  }
    try {
      const response = await axios.get(`${SERVER_API_URL}/user/searchUser/${e.target.value}/10/0`, { 
        headers: {
          'Authorization': `${accessToken}`
        }
      });
      // console.log(response.data);
      setSearchResults(response.data.data); 
    } catch (error) {
      console.error("An error occurred while fetching the data", error);
    }
    
  };

  // 팔로우 버튼 클릭 처리
  const { followings, setFollowings } = useFollow();

  const handleFollow = async (nickname, user_no) => {
    if (!followings.includes(nickname)) {
      setFollowings(prevFollowing => [...prevFollowing, nickname]);
  
      // userNo 같이 보내줘야 작동함
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
        fullWidth 
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="친구 검색"
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            fullWidth 
            style={{ fontFamily: "MaplestoryOTFLight" }}
          />
        )}
       renderOption={(props, option) => (
  <li {...props} >
    <Link to={`/myfriend/${option.user_no}`} className="myLink">
    {option.user_nickname}
    </Link>
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
