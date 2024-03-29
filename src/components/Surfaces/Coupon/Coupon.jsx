import { Alert, Button, Typography, Paper, Box, Divider, TextField, IconButton, CssBaseline, } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {  Form, Formik } from 'formik';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import DataService from '../../../Firebase/firestore';
import { collection, getDocs, getFirestore,
    addDoc, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
 import { initializeApp } from "firebase/app";
 import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../../../Firebase/firebase';
import useStore from '../../../store/useStore';
import couponFormShema from '../couponFormShema';
import CouponImages from './CouponImages';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getAuth } from "firebase/auth";
import Popover from '@mui/material/Popover';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import s from './Coupon.module.css';

 const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
 };
 
 
 
 initializeApp(firebaseConfig);
 
 
 const db = getFirestore();
 const colRef = collection(db, 'bookmaker');


const Coupon = (props) => {

  // popover match
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
//
   
    const [authUser, setAuthUser] = useState(null);
   
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

/*
    const user = useStore((state) => state.user);
    const getUser = useStore((state) => state.getUser);
React.useEffect(() => {
    getUser();
}, [getUser]);
*/
    console.log(authUser)
    

   
    const auth = getAuth();
 const user = auth.currentUser;
    const getBalance = useStore((state) => state.getBalance)
   const transactions = useStore((state) => state.transactions)
    

   useEffect(() => {
     getBalance()
      
   }, [getBalance])
     
    const userBets =  transactions.filter(function(userBet) {
    return userBet.email == `${user.email}`;
});
console.log(userBets)
 
 /* const betsWithDate = userBets.map((el) => ({
    ...el,
    createdAt: userBets[0].createdAt == null ? null : el.createdAt.toDate()
  }));
  console.log(betsWithDate);
*/

  
  const sortByDate = userBets.sort(function(a, b) {
    return b.createdAt - a.createdAt;
  });
  console.log(sortByDate);









    const [stake, setStake] = useState('');
    const [market, setMarket] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState({error: false})

    
    
   const handleSubmit = async (e) => {
   
   e.preventDefault();
    let market = marketInfoList;
    console.log(marketInfoList);
    let priceSelector = document.querySelector('#price')
    let priceValue = priceSelector.getAttribute('value');
    console.log(priceValue);
    let price = priceValue;

    
    
    

    setMessage('');
    console.log(price, stake, market,);
    if (stake === ''  || market === '' || price === '') {
        setMessage({error: true, msg: 'Please, enter the stake.'})
        setTimeout(() => {
            setMessage('');
          }, 6000);
        
        return;
    }

    if (sortByDate[0].balance-stake < 0) {
        setMessage({error: true, msg: 'Check the balance. Bet over the balance'})
        setTimeout(() => {
            setMessage('');
          }, 6000);
        
        return;
    }
   const newBet = {price, stake, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)
   const newUser = {createdAt: serverTimestamp(), email: authUser.email, balance: sortByDate[0].balance-stake}
   try {
    await DataService.addBets(newBet);
    reset()
   DataService.addUser(newUser)
   setTimeout(() => {
    getBalance();
  }, 3000);
   
    setMessage({error: false, msg: "Bet accepted succesfully!"});
    setTimeout(() => {
        setMessage('');
      }, 4000);

   } catch (err) {
    setMessage({error: true, msg: err.message});
    setTimeout(() => {
        setMessage('');
      }, 6000);
   }
   setMarket('');
   setStake('');
   setPrice('');
   }



const onStakeChange = event => {
     
  setStake( event.target.value );
 
};


const marketInfoList = useStore((state) => state.marketInfoList)
console.log(marketInfoList);


const removeToMarketInfoList = useStore((state) => state.removeToMarketInfoList)

let result = marketInfoList.map(item => item.price);
console.log(result)
let overallPrice = result.reduce((acc, rec) => acc * rec, 1)
console.log(overallPrice)
  
let reset = useStore((state) => state.reset);

const [alert, setAlert] = useState(true);
 
useEffect(() => {
  setTimeout(() => {
    setAlert('');
  }, 6000);
}, [message]);     

//swipe

 
  const [couponOpen, setCouponOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setCouponOpen(newOpen);
  };
  const drawerBleeding = 45



//

const stakeHandler = (e) => {
  setStake(e.currentTarget.value)
}

    return (
    
      <Box >
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(45% - ${drawerBleeding}px)`,
            overflow: 'visible',
           

          },
        }}
      />
      
      <SwipeableDrawer
       
        anchor="bottom"
        open={couponOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        
      >
        <Box
          sx={{
            position: 'relative',
            marginTop: `${-drawerBleeding}px`,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            
            right: 0,
            left: 0,
            display: {md: 'none', xs: 'block', },
            height: 'auto',
          }}
        >
          
          <Box sx={{  width: 50,
  height: 6,
  backgroundColor: 'yellow.backgroundColor',
  borderRadius: 3,
  position: 'relative',
  top: 8,
  left: 'calc(50% - 25px)',}}></Box>
          <Paper sx={{backgroundColor:'greenPrimaryDark.backgroundColor',
             color:'greenPrimaryDark.color', borderRadius: 0, borderTopLeftRadius: 15,
             borderTopRightRadius: 15,
             height: '8vh', width: '100%', display: 'flex',
             flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: -1}}>
             {result.length == 0 || null 
             ? <Box sx={{padding: 3, }}></Box>  
             : <Box sx={{padding: 3, }}>{result.length} choices </Box>}
              <Box sx={{ position: 'fixed', left: 'calc(50% - 28px)' }}>Coupon</Box>
              <Box></Box> 
             </Paper>

        </Box>
        <Box
          sx={{
            backgroundColor:'greyPrimary.backgroundColor',
            height: '40vh',
            overflow: 'auto',
            display: 'block',
        flexWrap: 'wrap', width: '100%',   justifyContent: 'center', alignItems: 'center', 
          }}
        >
          <div >{ 
                    message?.msg && (
                       
                    <Alert  sx={{ backgroundColor:'blackSecondaryDark.backgroundColor', color:'blackSecondaryDark.color'}} 
                    severity={message?.error ? 'error':'success'}
                    onClose={() =>  setMessage('') }> 
                        {message?.msg}
                    </Alert>
                   
                )
                    }</div>
                   
            <Box sx={{width: '100%', }}> {
              marketInfoList == 0 
                ?   <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '40vh', display: 'flex',
                flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column',}}> 
                    <Typography sx={{ display: 'flex',
                flexWrap: 'wrap', justifyContent: 'center',
                 alignItems: 'center', fontSize: '0.8rem', position: 'fixed', left: 'calc(50% - 70px)'}}>Click on market for a bet</Typography>
                 
                    </Paper>
                : <Paper  sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, }}
                initialValues={{stake: '', market: ''}}
                onSubmit={handleSubmit}
                >
        


                <Box sx={{ height: '100%', marginTop: 1, paddingBottom: 2, maxHeight: 230, overflow: 'auto', display:'flex', flexDirection: 'column'}}>{marketInfoList.map((market) => (
                <div  key={market.name} >
                    <div style={{display: 'flex',
                 flexDirection: 'row',
                height: '3rem', }}>

                    <IconButton size="small" sx={{justifyContent:'center', color: 'yellow.backgroundColor', height: '2rem', width: '2rem',}} variant="text" onClick={() => removeToMarketInfoList(market.name)}><HighlightOffIcon/></IconButton>
                   <div style={{
                 alignItems: 'center', flexDirection: 'row', backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', }}>
                    <div style={{display: 'flex',
                 alignItems: 'center', justifyContent:'space-between', flexWrap: 'wrap', backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, }}>
                    <Typography sx={{ flexDirection: 'row', justifyContent: 'flex-start', fontWeight: 'bold',backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, fontSize: '1em'}}  id='market' name='market' value={market.name}>{market.name}&nbsp;{market.point}
                    </Typography>
                    <Typography sx={{ flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold', marginRight: '0', fontSize: '1em' }}>{market.price}</Typography>
                    </div>
                    
                    <Typography  
                    sx={{ dataTooltip:"" ,display: 'block', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', fontSize:'0.7em',
                whiteSpace: {md:'nowrap', xs: 'none'}, overflow: {md:'hidden', xs:'none'}, textOverflow: {md:'ellipsis', xs:'none'}, }}  id='match' name='match' value={market.match}>{market.match.slice( 0, 57).length < market.match.length ? market.match.slice( 0, 57)+'...' : market.match}</Typography>
              
                    </div>
                    </div>
                   

                </div>
               ))}
           {overallPrice == 1 
           ? <Typography >Overall price: {''}</Typography>
           : <Paper  sx={{backgroundColor:'greyPrimary.backgroundColor',
           color:'greyPrimary.color', borderRadius: 0, alignItems: 'end', position: 'fixed', width: '100%', bottom: 0}}>
            <Paper sx={{ display: 'flex',
  flexFlow: 'nowrap', alignItems: 'center',
  height: '100%', justifyContent: 'space-around',  backgroundColor:'greyPrimary.backgroundColor',
  color:'greyPrimary.color', borderRadius: 0}}>
    <Typography  sx={{fontSize: '.8em'}}>Folds: {result.length}</Typography>
           <Typography sx={{fontSize: '.8em'}} name='price' value={overallPrice} id='price'>Price:  {overallPrice.toFixed(2)}</Typography>
         
           <Formik
           initialValues={{stake: '', market: '', overalPrice: '',}}
           onSubmit={handleSubmit}
           validationSchema={couponFormShema}
          
           > 
            <Form>
           
                <TextField  className={s.input}
                size="small" sx={{fontSize:'0.6em',
                 width: '10em',  margin: '0.5em', 
                  input: {color: 'greenPrimary.backgroundColor', fontWeight: 'bold', backgroundColor: '#c9c9c9', textAlign:'end' } }}
                 placeholder='Amount' variant="outlined"  id='stake'   value={stake}  
                type='number' name='stake' InputProps={{
                  inputProps: { min: 0 }
                }}
                onKeyPress={(event) => {
                  if (event?.key === '-' || event?.key === '+') {
                    event.preventDefault();
                  }
                }}
            onChange={(e) => {stakeHandler(e)}}
           ></TextField>
               
            </Form> 
           </Formik>
            </Paper>
            
            <Paper>
             <Button sx={{backgroundColor:'greenPrimary.backgroundColor',
  color:'greenPrimary.color', width:'100%', display: 'flex',
  position: 'relative', top: '100%',
  flexDirection: 'column', "&:hover": {
    backgroundColor: "greenPrimary.backgroundColor"
  }, 
  height: '100%'}}  onClick={handleSubmit} variant="primary"  type='submit'>
    <Typography sx={{fontWeight: 'bold', textTransform: 'capitalize', fontSize: '1em'}}>Place bet</Typography> 
    <Typography sx={{fontSize: '0.6em', textTransform: 'capitalize'}}>to return {(overallPrice*stake).toFixed(2)}</Typography>
    </Button>
             </Paper>
             </Paper>
           }
</Box>  
            
  
     
</Paper>
                
               
                }
               <CouponImages />
            </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
        
    );
}

export default Coupon;