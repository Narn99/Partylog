import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchFriend() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', md: '600px', sm: '400px' },
      borderRadius: '20px', backgroundColor: '#F2E5E6'
     }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="친구 검색"
        style={{ fontFamily: 'HakgyoansimWoojuR' }}
        inputProps={{ 'aria-label': 'search your friend' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
     
    </Paper>
  );
}