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
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SportsMenu from './SportsMenu';
import CssBaseline from '@mui/material/CssBaseline';

const Header = () => {

 
  const auth = getAuth();
  const user = auth.currentUser;
console.log(auth.currentUser)

   const getBalance = useStore((state) => state.getBalance)
  const transactions = useStore((state) => state.transactions)
 // const snapBalance = useStore((state) => (state.snapBalance), shallow);
  
  const toggleOpen = useStore((state) => state.toggleOpen)
  const open = useStore((state) => state.open)
  
console.log(open)


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

const [anchorElMenu, setAnchorElMenu] = React.useState(null);
const openMenu = Boolean(anchorElMenu);
const handleClickMenu = (event) => {
  setAnchorElMenu(event.currentTarget);
};
const handleCloseMenu = () => {
  setAnchorElMenu(null);
};


  return (
       
    <React.Fragment >
<CssBaseline />
  <AppBar  sx={{  backgroundColor: '#027b5b',}}  >
<Toolbar>
{ authUser ? 
<Box>
  <IconButton  id="demo-customized-button"
        aria-controls={openMenu ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClickMenu}  sx={{display: {xs: 'flex', md: 'none'}, color: 'yellow.backgroundColor', backgroundColor:'greenPrimaryDark.backgroundColor', marginRight: '1em'}}>
   { openMenu 
   ? <HighlightOffIcon  sx={{size: 'large'}}/>
   : <ScoreboardIcon  sx={{size: 'large'}}/>}
    </IconButton>
<Menu id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
          disablePadding: true
        }}
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={handleCloseMenu}
        dense={false} disableGutters={true}
        sx={{marginLeft: '-1.5em', marginTop: '0.8em',}}
        
        >
        
<SportsMenu sx={{paddingTop: 0}}/>

</Menu>
</Box>
: null }
<Box sx={{display: 'flex', justifyContent: 'start', width: {xs: '10em', md:'15em'}, height: {xs: '2em', md:'3em'}}}>
<img style={{  width:'100%', height: '100%'}}  src={logasterTop}></img>
</Box>
<Typography sx={{ flexGrow: 1,}}></Typography>

{/*<Button  onClick={userSignOut} sx={{ flexGrow: 1, margin: '1rem', color: '#027b5b'}}  >
<LogoutIcon  sx={{  color: 'salat'}}  ></LogoutIcon>
 log out</Button>
  */}
   { authUser ? 
  
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center' }}>
    
  <div style={{display:'flex', justifyContent: 'center', alignItems: 'center' }}>
  {sliceBalance.map((key) => { return (
    <Typography key={key.balance}  sx={{ color: 'yellow.backgroundColor', fontSize: '.8em'}}>Balance: {key.balance}</Typography>
   )})}
 {/*<IconButton onClick={() => onClickBalance()}>
 <CachedIcon/>
 </IconButton>*/}
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
                
                <MenuItem sx={{ color: 'yellow.backgroundColor', backgroundColor: 'greenPrimaryDark.backgroundColor', fontSize: {xs:'0.7em', md:'1em'}}} onClick={()=>{navigateToLc();handleClose()}}><AccountCircleIcon/>  My profile: {authUser.email.split('@')[0]}</MenuItem>
                <MenuItem sx={{ color: 'yellow.backgroundColor', backgroundColor: 'greenPrimaryDark.backgroundColor', fontSize: {xs:'0.7em', md:'1em'}}} onClick={()=>{navigateToMain();handleClose()}}><PlayCircleIcon/> Back to the game</MenuItem>
                <MenuItem sx={{ color: 'yellow.backgroundColor', backgroundColor: 'greenPrimaryDark.backgroundColor', fontSize: {xs:'0.7em', md:'1em'}}} onClick={userSignOut}><LogoutIcon  sx={{  color: 'salat'}}  ></LogoutIcon>  Log Out</MenuItem>
                
              </Menu>
            </div>
            </div>
  
  : null}
  
</Toolbar>
</AppBar>

</React.Fragment>

)
}

export default Header