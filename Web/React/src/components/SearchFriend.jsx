import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useFollow } from "../context/FollowContext"


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
  const { setFollowings } = useFollow();

  const handleFollow = (nickname) => {
    setFollowings(prevFollowing => [...prevFollowing,  nickname ]);
    // 팔로우 로직 구현
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          minWidth: "150px",
          backgroundColor: "#F2E5E6",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="친구 검색"
          inputProps={{ "aria-label": "search your friend" }}
          style={{ fontFamily: "MaplestoryOTFLight" }}
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {searchTerm && (
        <Paper
          sx={{
            mt: 1,
            p: "10px",
            backgroundColor: "#F2E5E6",
          }}
        >
          <List>
            {searchResults.map((result, index) => (
              <ListItem key={index} sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
                {result.userNickname}
                <Button variant="outlined" onClick={() => handleFollow(result.userNickname)}>팔로우</Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
