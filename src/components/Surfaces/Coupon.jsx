import { Button, Switch, Typography } from '@mui/material';
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
import getName from '../../store/express';
import CouponName from './CouponName';
import express from '../../store/express';
import  ordinar  from '../../store/ordinar';
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
   const [message, setMessage] = useState({error: false, msg: 'oh no, error'})
const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (stake === '' || market === '') {
        setMessage({error: true, msg: 'what a fuck?'});
        return;
    }

   const newBet = {price, stake, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)

   try {
    await addBet(newBet);
    setMessage({error: false, msg: "bet accepted succesfully!"});
   } catch (err) {
    setMessage({error: true, msg: err.message});
   }
   setMarket('');
   setStake('');
   setPrice('');
   }
 
   
const addBet = (newBet) => {
    return addDoc(colRef, newBet)
}

const marketInfoList = useStore((state) => state.marketInfoList)
console.log(marketInfoList);

const removeToMarketInfoList = useStore((state) => state.removeToMarketInfoList)

let result = marketInfoList.map(item => item.price);
console.log(result)
let overallPrice = result.reduce((acc, rec) => acc * rec, 1)
console.log(overallPrice)

    return (
        <div className={s.coupon}>
            Coupon
            <div> {
              marketInfoList == 0 
                ?  <div>Choose the market</div>
                : <div onSubmit={( name) => {
console.log(name)
                }}>
        
<div>
                 
                   
                <div>{marketInfoList.map((market) => (
                <div key={market.name}>
                    <div>
                    
                    <Typography onChange={e => {setMarket(e.target.value)}} name='market'>{market.price}{' '}{market.name}
                    <button onClick={() => removeToMarketInfoList(market.name)}>x</button>
                    </Typography>
                    </div>
                    

                </div>
               ))}
           {overallPrice == 1 
           ? <Typography >Overall price: {''}</Typography>
           : <Typography onChange={e => {setPrice(e.target.value)}} name='price'>Overall price:  {overallPrice}</Typography>
           }
</div>  
            </div>
  
            <div>
               <Formik 
               initialValues={{stake: ''}}
               
               validationSchema={couponFormShema}
               > 
           
                <Form>
                    <Field id='stake'  min="1"   value={stake} placeholder='Stake' 
                    type='number' name='stake' 
                onChange={e => {setStake(e.target.value)}}
               ></Field>
                    <Button   type={'submit'}>make bet</Button>
                </Form> 
               </Formik>
                
</div>
</div>
                
               
                }
               
            </div>
        </div>
    );
}

export default Coupon;