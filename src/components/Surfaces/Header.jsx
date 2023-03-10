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

import { ThemeContext } from '@emotion/react';
import { Box } from '@mui/material';





const Header = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
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


  return (
       
  
<Box  >
  <AppBar position='center' >
<Toolbar >
  
  <Typography sx={{ my: 2, color: 'black'}} variant="h6" component="h4" >
     Sportsbook
  </Typography>
 
   { authUser ? 
   <>
  <Typography  justifyContent="center">
    Your login: {authUser.email.split('@')[0]}
  </Typography>
 
<LogoutIcon  sx={{  my: 2, color: 'black'}}  justifyContent="flex-end"></LogoutIcon>
  <Button  onClick={userSignOut} sx={{ my: 2, color: 'black', display: 'block' }}  >log out</Button>
  <IconButton aria-label="logout">
 
  </IconButton>
   
  </>
  : null}
</Toolbar>
</AppBar>
</Box>

)
}

export default Header