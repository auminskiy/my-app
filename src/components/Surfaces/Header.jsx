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
import { getAuth } from "firebase/auth";
import useStore from '../../store/useStore';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CachedIcon from '@mui/icons-material/Cached';
import { shallow } from 'zustand/shallow'

const Header = () => {

 
  const auth = getAuth();
  const user = auth.currentUser;
console.log(auth.currentUser)

   const getBalance = useStore((state) => state.getBalance)
  const transactions = useStore((state) => state.transactions)
  const snapBalance = useStore((state) => (state.snapBalance), shallow);
 

const onClickBalance = () => {
  getBalance();
  
}

   useEffect(() => {
    
    getBalance()
  
   }, [getBalance])
     console.log(transactions)


   

  const [visibleBalance, setvisibleBalance] = useState(true);

  const handleChange = () => {
    setvisibleBalance(!visibleBalance);
  }

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


let balancet = authUser == false ? null : transactions.filter(function(userBet) {
  return userBet.email == `${user == null ? null : user.email}`;})
console.log(balancet)

/*const balanceDate = balancet.map((el) => ({
 ...el,
 createdAt: balancet[0].createdAt==null ? () => getBalance() : el.createdAt.toDate()
}));
console.log(balanceDate);*/


const sortByDate =  balancet.sort(function(a, b) {
 return b.createdAt - a.createdAt;
});
console.log(sortByDate);
const sliceBalance = sortByDate.slice(0,1)
console.log(sliceBalance)

  return (
       
    <Box sx={{ display: 'flex', }}>

  <AppBar  sx={{  backgroundColor: '#027b5b',}} position='static' >
<Toolbar>
<img style={{ display: 'flex', justifyContent: 'start'}} width='300em' height= '60em' src={logasterTop}></img>
<Typography sx={{ flexGrow: 1,}}></Typography>

{/*<Button  onClick={userSignOut} sx={{ flexGrow: 1, margin: '1rem', color: '#027b5b'}}  >
<LogoutIcon  sx={{  color: 'salat'}}  ></LogoutIcon>
 log out</Button>
  */}
   { authUser ? 
  
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center' }}>
    
  <div style={{display:'flex', justifyContent: 'center', alignItems: 'center' }}>
  {sliceBalance.map((key) => { return (
    <Typography key={key.balance}  sx={{ color: 'yellow.backgroundColor',}}>Balance: {key.balance}</Typography>
   )})}
 <IconButton onClick={() => onClickBalance()}>
 <CachedIcon/>
 </IconButton>
 </div> 

{/* <div  onClick={() => handleChange()}>
   { visibleBalance ? <VisibilityOffIcon sx={{marginRight:'2em'}}/> : <VisibilityIcon sx={{marginRight:'2em'}}/>}
   </div>*/} 
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
                    backgroundColor: 'greenPrimaryDark.backgroundColor',
                  },
                }}
              >
                
                <MenuItem sx={{ color: 'yellow.backgroundColor', backgroundColor: 'greenPrimaryDark.backgroundColor'}} onClick={()=>{navigateToLc();handleClose()}}><AccountCircleIcon/>  My profile: {authUser.email.split('@')[0]}</MenuItem>
                <MenuItem sx={{ color: 'yellow.backgroundColor', backgroundColor: 'greenPrimaryDark.backgroundColor'}} onClick={()=>{navigateToMain();handleClose()}}><PlayCircleIcon/> Back to the game</MenuItem>
                <MenuItem sx={{ color: 'yellow.backgroundColor', backgroundColor: 'greenPrimaryDark.backgroundColor'}} onClick={userSignOut}><LogoutIcon  sx={{  color: 'salat'}}  ></LogoutIcon>  Log Out</MenuItem>
                
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