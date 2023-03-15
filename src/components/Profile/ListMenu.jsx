import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import auth from '../../Firebase/firebase';
import { signOut } from 'firebase/auth';

const ListMenu = () => {
    
    const navigate = useNavigate();
   
    const navigateToBets = () => {
        navigate('/lc/bets')
      }
      const navigateToProfileInfo = () => {
        navigate('/lc/profile')
      }
      
    const userSignOut = () => {
      signOut(auth).then(() => {
          navigate('/login')
          console.log('sign out successful')
      }).catch(error => {
          console.log(error);
          
      } )
  }

  

  return (
    <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
    
      <List>
        <ListItem onClick={()=>{navigateToProfileInfo()}} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem  onClick={()=>{navigateToBets()}}  disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CurrencyExchangeIcon />
            </ListItemIcon>
            <ListItemText primary="Bets" />
          </ListItemButton>
        </ListItem>
      </List>
    
    <Divider />
    
      <List>
        <ListItem onClick={userSignOut} disablePadding>
          <ListItemButton>
          <ListItemIcon>
          <MeetingRoomIcon/>
          </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
    </List>
  </Box>
  )
}

export default ListMenu;