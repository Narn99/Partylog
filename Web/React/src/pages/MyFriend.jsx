import React from "react";
import NavBar from "../components/NavBar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import FollowTabs from '../components/FollowTabs';
import { useSelector } from "react-redux";


const Box1 = styled(Box)(({ theme }) => ({
  backgroundColor: '#fbb3c2',
  borderRadius: '30px',
  padding: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '500px',
    width: '100%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: '500px',
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    height: '500px',
    width: '100%',
  },
}));


function MyFriend(props) {
 // useSelector를 사용하여 리듀서에서 정보 받아오는 곳
  const profileImg = useSelector((state) => {
    return state.auth.userData.userProfile;
  });

  return (
    <div>
      <NavBar />
      <div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <img
              src={profileImg}
              alt="profileimg"
              className="UserPage-profileimg"
              style={{
                  maxWidth: "280px",
                  maxHeight: "280px",
                    }}
                    />
            <p className="UserPage-nickname">몰?루</p>
          </Grid>
        </Grid>
   
    
        <Grid item sm={12} md={8}>
          <Box1>
            <div className="follow-tabs-background">
            <FollowTabs />
            </div>
          </Box1>
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
}

export default MyFriend;
