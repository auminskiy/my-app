import { Alert, Button, Typography, Paper, Box, Divider, TextField, IconButton } from '@mui/material';
import {  Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
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
        getBalance();
    }, [getBalance])
   console.log(transactions)

   let userBets =  transactions.filter(function(userBet) {
    return userBet.email == `${user.email}`;
});
console.log(userBets)
 
  const betsWithDate = userBets.map((el) => ({
    ...el,
    createdAt: el.createdAt.toDate()
  }));
  console.log(betsWithDate);


  
  const sortByDate = betsWithDate.sort(function(a, b) {
    return b.createdAt - a.createdAt;
  });
  console.log(sortByDate);
  

 







    const [stake, setStake] = useState('');
    const [market, setMarket] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState({error: false})

    const newUser = {createdAt: serverTimestamp(), email: sortByDate[0].email, balance: sortByDate[0].balance-stake}
    
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
    if (stake === '' || market === '' || price === '') {
        setMessage({error: true, msg: 'Please, enter the stake.'})
        setTimeout(() => {
            setMessage('');
          }, 6000);
        
        return;
    }

   const newBet = {price, stake, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)

   try {
    await DataService.addBets(newBet);
    reset()
    DataService.addUser(newUser)
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

   /*
const addBet = (newBet) => {
    return addDoc(colRef, newBet)
}
*/



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
 
    return (
        <Box sx={{display: 'flex',
        flexWrap: 'wrap', width: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center',
     }} >
            <Paper sx={{backgroundColor:'greenPrimaryDark.backgroundColor',
             color:'greenPrimaryDark.color', borderRadius: 0,
             height: '5vh', width: '100%', display: 'flex',
             flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>Coupon</Paper>
            
            <div >{ 
                    message?.msg && (
                       
                    <Alert  sx={{ backgroundColor:'blackSecondaryDark.backgroundColor', color:'blackSecondaryDark.color'}} 
                    severity={message?.error ? 'error':'success'}
                    onClose={() =>  setMessage('') }> 
                        {message?.msg}
                    </Alert>
                   
                )
                    }</div>
                   
            <div style={{width: '100%'}}> {
              marketInfoList == 0 
                ?   <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '10vh', display: 'flex',
                flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}> 
                    <Typography sx={{ display: 'flex',
                flexWrap: 'wrap', justifyContent: 'center',
                 alignItems: 'center', fontSize: '0.8rem'}}>Click a market for a bet</Typography>
                    </Paper>
                : <Paper  sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0}}
                initialValues={{stake: '', market: ''}}
                onSubmit={handleSubmit}
                >
        
<div >

                <div >{marketInfoList.map((market) => (
                <div  key={market.name}>
                    <div style={{display: 'flex',
                flexWrap: 'wrap', flexDirection: 'row',
                height: '3rem',}}>

                    <IconButton size="small" sx={{justifyContent:'center', color: 'yellow.backgroundColor', height: '2rem', width: '2rem',}} variant="text" onClick={() => removeToMarketInfoList(market.name)}><HighlightOffIcon/></IconButton>
                   <div style={{
                 alignItems: 'center', flexDirection: 'row', backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', }}>
                    <div style={{display: 'flex',
                 alignItems: 'center', justifyContent:'space-between', flexWrap: 'wrap', backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, }}>
                    <Typography sx={{ flexDirection: 'row', justifyContent: 'flex-start', fontWeight: 'bold',backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0,}}  id='market' name='market' value={market.name}>{market.name}&nbsp;{market.point}
                    </Typography>
                    <Typography sx={{ flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold', marginRight: '0' }}>{market.price}</Typography>
                    </div>
                    
                    <Typography sx={{ dataTooltip:"" ,display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', fontSize:'0.7em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}  id='match' name='match' value={market.match}>{market.match.slice( 0, 57).length < market.match.length ? market.match.slice( 0, 57)+'...' : market.match}</Typography>
                    </div>
                    </div>
                    <Divider/>

                </div>
               ))}
           {overallPrice == 1 
           ? <Typography >Overall price: {''}</Typography>
           : <Paper  sx={{backgroundColor:'greyPrimary.backgroundColor',
           color:'greyPrimary.color', borderRadius: 0}}>
            <Paper sx={{ display: 'flex',
  flexFlow: 'nowrap', alignItems: 'center',
  height: '100%', justifyContent: 'space-around',  backgroundColor:'greyPrimary.backgroundColor',
  color:'greyPrimary.color', borderRadius: 0}}>
    <Typography  >{result.length} Folds</Typography>
           <Typography  name='price' value={overallPrice} id='price'>Price:  {overallPrice.toFixed(2)}</Typography>
          
           <Formik 
           initialValues={{stake: '', market: '', overalPrice: '',}}
           onSubmit={handleSubmit}
           validationSchema={couponFormShema}
           
           > 
            <Form>
           
                <TextField size="small" sx={{fontSize:'0.6em',
                 width: '20ch', margin: '0.5em', 
                  input: {color: 'greenPrimary.backgroundColor', fontWeight: 'bold', backgroundColor: '#c9c9c9', textAlign:'end' } }}
                 placeholder='Amount' variant="outlined"  id='stake'  min="1"   value={stake}  
                type='tel' name='stake' 
            onChange={e => {setStake(e.target.value)}}
           ></TextField>
               
            </Form> 
           </Formik>
            </Paper>
            <Paper>
             <Button sx={{backgroundColor:'greenPrimary.backgroundColor',
  color:'greenPrimary.color', width:'100%', display: 'flex',
  flexDirection: 'column', "&:hover": {
    backgroundColor: "greenPrimary.backgroundColor"
  },
  height: '100%'}}  onClick={handleSubmit} variant="primary"  type='submit'>
    <Typography sx={{fontWeight: 'bold', textTransform: 'capitalize'}}>Place bet</Typography> 
    <Typography sx={{fontSize: '0.6em', textTransform: 'capitalize'}}>to return {(overallPrice*stake).toFixed(2)}</Typography>
    </Button>
             </Paper>
             </Paper>
           }
</div>  
            </div>
  
     
</Paper>
                
               
                }
               <CouponImages/>
            </div>
           
        </Box>
    );
}

export default Coupon;