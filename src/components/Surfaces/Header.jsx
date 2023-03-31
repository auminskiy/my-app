import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase';
import { useNavigate } from 'react-router';
import logasterTop from '../../img/logasterTop.svg'
import { Box, Menu, MenuItem, MenuList } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';







const Header = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  
  const navigateToLc = () => {
    navigate('/lc/profile')
  }
  const navigateToMain = () => {
    navigate('/main/soccer')
  }
  
  
  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
              setAuthUser(user)
          }
          else {
              setAuthUser(null);
          }

      });
      return () => {
          listen();
      }
  }, []);
 
  const userSignOut = () => {
    signOut(auth).then(() => {
        navigate('/login')
        console.log('sign out successful')
    }).catch(error => {
        console.log(error);
        
    } )
}

const [anchorEl, setAnchorEl] = React.useState(null);


const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  return (
       
    <Box sx={{ display: 'flex' }}>

  <AppBar  sx={{  backgroundColor: '#027b5b' }} position='static' >
<Toolbar >
<img  /*width='400em' height= '110em'*/ src={logasterTop}></img>
 
 
   { authUser ? 
   <div style={{display: 'flex',
   alignItems: 'center', flexDirection: 'row', flexGrow: 1 }}>
   
 
  <Button  onClick={userSignOut} sx={{ flexGrow: 1, margin: '1rem', color: '#027b5b'}}  >
<LogoutIcon  sx={{  color: 'salat'}}  ></LogoutIcon>
 log out</Button> 
 <div >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                
              >
                <AccountCircle  sx={{  color: 'yellow.backgroundColor'}} />
              </IconButton>
              <Menu
              sx={{ padding: 0}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 2,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 0,
                    backgroundColor: 'greyPrimary.backgroundColor',
                  },
                }}
              >
                
                <MenuItem sx={{ color: 'greyPrimary.color', backgroundColor: 'greyPrimary.backgroundColor'}} onClick={()=>{navigateToLc();handleClose()}}><AccountCircleIcon/>  My profile: {authUser.email.split('@')[0]}</MenuItem>
                <MenuItem sx={{ color: 'greyPrimary.color', backgroundColor: 'greyPrimary.backgroundColor'}} onClick={()=>{navigateToMain();handleClose()}}><PlayCircleIcon/> Back to the game</MenuItem>
                <MenuItem sx={{ color: 'greyPrimary.color', backgroundColor: 'greyPrimary.backgroundColor'}} onClick={userSignOut}><LogoutIcon  sx={{  color: 'salat'}}  ></LogoutIcon>  Log Out</MenuItem>
                
              </Menu>
            </div>

  </div>
  : null}
</Toolbar>
</AppBar>
</Box>

)
}

export default Header