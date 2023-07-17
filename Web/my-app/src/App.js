import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person'
import Home from './pages/Home'
import MyPage from './pages/MyPage'
import LogInPage from './pages/LogInPage'
import SearchFriend from './pages/SearchFriend'
// import KakaoRedirectHandler from './components/KakaoCallback';
import SearchIcon from '@mui/icons-material/Search';
import KakaoCallback from './pages/kakaoCallback';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'flex-end'}}>
          <IconButton color="inherit" edge="end" component={Link} to="/" style={{marginRight: '20px'}}>
            <HomeIcon />
            <Typography variant="h6" color="inherit" component="div">
              Home
            </Typography>
          </IconButton>
          <IconButton color="inherit" edge="end" component={Link} to="/loginPage" style={{marginRight: '20px'}}>
            <LoginIcon />
            <Typography variant="h6" color="inherit" component="div">
              LogIn
            </Typography>
          </IconButton>
          <IconButton color="inherit" edge="end" component={Link} to="/mypage" style={{marginRight: '20px'}}>
            <PersonIcon />
            <Typography variant="h6" color="inherit" component="div">
              MyPage
            </Typography>
          </IconButton>
          <IconButton color="inherit" edge="end" component={Link} to="/searchfriends">
            <SearchIcon />
            <Typography variant="h6" color="inherit" component="div">
              SearchFriend
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpage" element={<LogInPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/searchfriends" element={<SearchFriend />} />
        {/* <Route path="/auth" element={<KakaoRedirectHandler />} /> */}
        <Route path="/kakaoCallback" element={<KakaoCallback />} />
      </Routes>
    </Router>
  )
}

export default App
