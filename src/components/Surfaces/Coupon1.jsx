import { Alert, Button, Switch, Typography } from '@mui/material';
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
import UseTeam from '../../store/UseTeam';

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


const Coupon1 = (props) => {

   
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
    
    const [flag, setFlag] = useState(true);
    const [stake, setStake] = useState('');
    let [market, setMarket] = useState('');
    const [price, setPrice] = useState('');
   const [message, setMessage] = useState({error: false, msg: 'oh no, error'})
const handleSubmit = async (e) => {
    let elem = document.querySelector('#market')
    let marketValue = elem.getAttribute('value');
    console.log(marketValue);
    let market = marketValue;
    
    setMessage('');
    if (stake === '' || market === '') {
        setMessage({error: true, msg: 'what a fuck?'});
        return;
    }

   const newBet = {stake, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)

   try {
    await DataService.addBets(newBet);
    setMessage({error: false, msg: "bet accepted succesfully!"});
   } catch (err) {
    setMessage({error: true, msg: err.message});
   }
   setMarket('')
   setStake('');
   setPrice('');
   }
 
  /* 
const addBet = (newBet) => {
    return addDoc(colRef, newBet)
}*/

const marketInfoList = useStore((state) => state.marketInfoList)
console.log(marketInfoList);
/*
const removeToMarketInfoList = useStore((state) => state.removeToMarketInfoList)

let result = marketInfoList.map(item => item.price);
console.log(result)
let overallPrice = result.reduce((acc, rec) => acc * rec, 1)
console.log(overallPrice)
*/
//const marketInfoList = UseTeam((state) => state.oddsInfo)
    return (
        <div className={s.coupon}>
            Coupon
           <div>{
            message?.msg && (<Alert variant={message?.error ? 'danger':'success'}
            dismissible onClose={() => setMessage('')}>
                
                {message?.msg}
            </Alert>)
            }</div>
               <Formik 
               initialValues={{stake: '', market: ''}}
               onSubmit={handleSubmit}
               validationSchema={couponFormShema}
               > 
             
          
                <Form>
                <div>{marketInfoList.map((market) => (
                <div key={market.name}>
                    <div>
                    <button /*onClick={() => removeToMarketInfoList(market.name)}*/>x</button>
                    <label id='market' name='market' value={market.name}>{market.price}{' '}{market.name}
                    
                    </label>
                    </div>
                    

                </div>
               ))}
               </div>
                    <Field id='stake'    placeholder='stake' 
                    type='text' name='stake' value={stake}
                onChange={e => {setStake(e.target.value)}}
               >
                
               </Field>
              
                
                </Form> 
                
               </Formik>
               <Button onClick={handleSubmit} variant="primary"  type='submit'>make bet</Button>
</div>

                
               
                
               
       
    );
}

export default Coupon1;