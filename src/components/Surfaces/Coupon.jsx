import { Alert, Button, Stack, Typography, List, Paper, CssBaseline, Box, Divider } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import DataService from '../../Firebase/firestore';

import datas from '../../Firebase/firestore';
import s from './Coupon.module.css';


import { collection, getDocs, getFirestore,
    addDoc, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
 import { initializeApp } from "firebase/app";
 import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase';
import { useNavigate } from 'react-router';
import useStore from '../../store/useStore';

import CouponName from './CouponName';

import couponFormShema from './couponFormShema';
import * as Yup from "yup";
import classnames from 'classnames';

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
    console.log(price, stake, market);
    if (stake === '' || market === '' || price === '') {
        setMessage({error: true, msg: 'Please, enter the stake.'});
        return;
    }

   const newBet = {price, stake, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)

   try {
    await DataService.addBets(newBet);
    reset()
    
    setMessage({error: false, msg: "Bet accepted succesfully!"});
  
   } catch (err) {
    setMessage({error: true, msg: err.message});
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


    return (
        <Box sx={{display: 'flex',
        flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center'}} >
          
            <Paper sx={{backgroundColor:'greenPrimaryDark.backgroundColor',
             color:'greenPrimaryDark.color', borderRadius: 0,
             height: '5vh', width: '100%', display: 'flex',
             flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>Coupon</Paper>
            
            <div >{
                    message?.msg && (<Alert variant={message?.error ? 'success':'danger'}
                     onClose={() => setMessage('')}>
                        
                        {message?.msg}
                    </Alert>)
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
                height: '100%',}}>
                    <Button sx={{color: 'yellow.backgroundColor'}} variant="text" onClick={() => removeToMarketInfoList(market.name)}>x</Button>
                    <Typography sx={{display: 'flex',
                flexWrap: 'wrap', justifyContent: 'center',
                 alignItems: 'center', fontWeight: 'bold'}}  id='market' name='market' value={market.name}>{market.name}{' '}{market.price}
                    
                    </Typography>
                    </div>
                    

                </div>
               ))}
           {overallPrice == 1 
           ? <Typography >Overall price: {''}</Typography>
           : <Typography  name='price' value={overallPrice} id='price'>Overall price:  {overallPrice}</Typography>
           }
</div>  
            </div>
  
            <div>
               <Formik 
               initialValues={{stake: '', market: '', overalPrice: '',}}
               onSubmit={handleSubmit}
               validationSchema={couponFormShema}
               > 
           
                <Form>
                    <Field id='stake'  min="1"   value={stake} placeholder='Stake' 
                    type='number' name='stake' 
                onChange={e => {setStake(e.target.value)}}
               ></Field>
                    <Button   onClick={handleSubmit} variant="primary"  type='submit'>make bet</Button>
                </Form> 
               </Formik>
                
</div>
</Paper>
                
               
                }
                <Paper sx={{display: 'flex',
                        flexDirection: 'column',
                        height: '100%'}}>
                <Divider sx={{ backgroundColor: 'greenPrimaryDark.backgroundColor', height: '0.5em' }} variant='fullWidth'/>
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
              
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{ margin: '0.6rem',
                    }}>Play with your favorite atheletes.</Typography>
                    <img style={{
                height: '100%', width: '100%', display: 'flex',
                flexWrap: 'wrap',}}src='https://www.gannett-cdn.com/presto/2019/12/19/USAT/68072d0d-5890-45ed-a424-15709e6ad9a4-decade-illo-sheet.jpg?crop=2462,1385,x2401,y2347&width=2462&height=1385&format=pjpg&auto=webp'/>
                   </div>
                    </Paper>
                    <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>  
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
               <Typography sx={{marginLeft: '0.4rem'}}>American football</Typography>
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '0.8rem', marginLeft: '0.2rem',
                    }}>is a team sport played by two teams of eleven players on a rectangular field with goalposts at each end.</Typography>
                    <img style={{
                height: '100%', width: '100%', display: 'flex',
                flexWrap: 'wrap',}}src='https://images.daznservices.com/di/library/DAZN_News/99/46/nfl-line-of-scrimmage_1r88qyqf60ada1wl7t2bzdodga.jpg?t=2046415169&quality=60&w=1280&h=720'/>
                   </div>
                    </Paper>
                    <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>  
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
               <Typography sx={{marginLeft: '0.4rem'}}>Baseball</Typography>
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '0.8rem', marginLeft: '0.2rem',
                    }}>is a bat-and-ball sport played between two teams of nine players each, taking turns batting and fielding.</Typography>
                    <img style={{
                height: '100%', width: '100%', display: 'flex',
                flexWrap: 'wrap',}}src='https://images.sidearmdev.com/crop?url=https%3a%2f%2fdxbhsrqyrr690.cloudfront.net%2fsidearm.nextgen.sites%2fgatorzone.com%2fimages%2f2023%2f3%2f21%2fSproat_NCBWA_Cover.jpg&height=576&width=1024&type=jpeg&gravity=smart'/>
                   </div>
                    </Paper>
                    <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
               <Typography sx={{marginLeft: '0.4rem'}}>Basketball</Typography>
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '0.8rem', marginLeft: '0.2rem',
                    }}>is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court.</Typography>
                    <img style={{
                height: '100%', width: '100%', display: 'flex',
                flexWrap: 'wrap',}}src='https://blog.playo.co/wp-content/uploads/2017/12/shooting-techniques-in-basketball.jpg'/>
                   </div>
                    </Paper>
                    </Paper>
            </div>
           
        </Box>
    );
}

export default Coupon;