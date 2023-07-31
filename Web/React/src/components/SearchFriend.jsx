import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFollow } from "../context/FollowContext";

export default function SearchFriend() {
  // 더미 데이터
  const dummyData = [
    { userNickname: "고양이" },
    { userNickname: "강아지" },
    { userNickname: "레서판다" },
    { userNickname: "펭귄" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 검색어가 변경될 때마다 결과 업데이트
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(dummyData.filter(user => user.userNickname.includes(e.target.value)));
  };

  // 팔로우 버튼 클릭 처리
  const { followings, setFollowings } = useFollow(); // 팔로잉 목록을 컨텍스트에서 가져옵니다.

  const handleFollow = (nickname) => {
    if (!followings.includes(nickname)) {
      setFollowings(prevFollowing => [...prevFollowing, nickname]);
       // 팔로우 로직 구현, 닉네임 중복방지
    }
  };

  return (
    <div>
      <Autocomplete
        options={searchResults}
        getOptionLabel={(option) => option.userNickname}
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
            {option.userNickname}
            <Button variant="outlined" onClick={() => handleFollow(option.userNickname)}>
              팔로우
            </Button>
          </li>
        )}
      />
    </div>
  );
}
