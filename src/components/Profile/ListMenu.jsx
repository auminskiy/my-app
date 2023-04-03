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
        navigate('/lc/bets');
        
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
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: 200, }}>
    
      <List component="nav" >
        <ListItem  onClick={()=>{navigateToProfileInfo()}} sx={{color: selectedIndex===0 ? 'yellow.backgroundColor': 'white' }} disablePadding
          >
          <ListItemButton selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)} 
          >
            <ListItemIcon>
              <AccountCircleIcon sx={{color: selectedIndex===0 ? 'yellow.backgroundColor': 'white' }}/>
            </ListItemIcon>
            <ListItemText  primary="Profile" sx={{color: selectedIndex===0 ? 'yellow.backgroundColor': 'white' }}/>
          </ListItemButton>
        </ListItem>
        <ListItem  onClick={()=>{navigateToBets()}} sx={{color: selectedIndex===1 ? 'yellow.backgroundColor': 'white' }} disablePadding>
          <ListItemButton  selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)} >
            <ListItemIcon>
              <CurrencyExchangeIcon sx={{color: selectedIndex===1 ? 'yellow.backgroundColor': 'white' }}/>
            </ListItemIcon>
            <ListItemText primary="Bets" sx={{color: selectedIndex===1 ? 'yellow.backgroundColor': 'white' }}/>
          </ListItemButton>
        </ListItem>
      </List>
    
    <Divider />
    
      <List>
        <ListItem onClick={userSignOut} disablePadding>
          <ListItemButton>
          <ListItemIcon>
          <MeetingRoomIcon sx={{color:'white'}}/>
          </ListItemIcon>
            <ListItemText primary="Log Out" sx={{color: selectedIndex===2 ? 'yellow.backgroundColor': 'white' }}/>
          </ListItemButton>
        </ListItem>
    </List>
  </Box>
  )
}

export default ListMenu;