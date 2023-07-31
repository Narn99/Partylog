import React from "react";
import NavBar from "../components/NavBar";
import molru from "../assets/molru.webp";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import FollowTabs from '../components/FollowTabs';


const Box1 = styled(Box)(({ theme }) => ({
  backgroundColor: '#fbb3c2',
  borderRadius: '30px',
  padding: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
    width: '100%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: '300px',
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    height: '500px',
    width: '100%',
  },
}));


function MyFriend(props) {
 
  return (
    <div>
     
      <NavBar />
     

      <div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <img src={molru} alt="profileimg" className="MyPage-profileimg" />
            <p className="MyPage-nickname">몰?루</p>
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
