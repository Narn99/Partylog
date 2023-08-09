import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function SearchFriend() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

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
      setSearchResults(response.data.data); 
    } catch (error) {
      console.error("An error occurred while fetching the data", error);
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
          <li {...props}>
            <Link to={`/user/${option.user_no}`} className="myLink">
              {option.user_nickname}
            </Link>
            <Link to={`/user/${option.user_no}`} className="myLink">
              <Button variant="outlined" style={{marginLeft: "10px"}}>
                친구의 페이지로 이동
              </Button>
            </Link>
          </li>
        )}
      />
    </div>
  );
}
