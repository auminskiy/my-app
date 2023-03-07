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
    const [time, setTime] = useState('');
   const [message, setMessage] = useState({error: false, msg: 'oh no, error'})
const handleSubmit = async (e) => {
    
    setMessage('');
    if (stake === '' || market === '') {
        setMessage({error: true, msg: 'what a fuck?'});
        return;
    }

   const newBet = {stake, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)

   try {
    await addBet(newBet);
    setMessage({error: false, msg: "bet accepted succesfully!"});
   } catch (err) {
    setMessage({error: true, msg: err.message});
   }
   setMarket('');
   setStake('');
   setTime('');
   }

   
const addBet = (newBet) => {
    return addDoc(colRef, newBet)
}
//const single = ordinar((state) => state.oddsInfo)
//console.log(single);
//const name = ordinar((state) => state.oddsInfo)
const marketInfoList = useStore((state) => state.marketInfoList)
console.log(marketInfoList);

const removeToMarketInfoList = useStore((state) => state.removeToMarketInfoList)



/*
let [singleMode, setSingleMode] = useState(true);

const activateSingleMode = () => {
    setSingleMode(true)
}

const deactivateSingleMode = () => {
    setSingleMode(false)
}
*/

    return (
        <div className={s.coupon}>
            Coupon
            <div> {
              marketInfoList == 0 
                ?  <div>Choose the market</div>
                : <div>
        
<div>
                 
                   
                <div>{marketInfoList.map((market) => (
                <div key={market.name}>
                    <div>
                    
                    <Typography >{market.price}{' '}{market.name}
                    <button onClick={() => removeToMarketInfoList(market.name)}>x</button>
                    </Typography>
                    </div>{ 
                    <Typography>Overall price: {}</Typography>
}
                </div>
               ))}

               
</div>  
            </div>
  
            <div>
               <Formik onSubmit={handleSubmit}
               initialValues={{stake: ''}}
               
               validationSchema={couponFormShema}
               > 
           
                <Form>
                    <Field id='stake'  min="1"   value={stake} placeholder={'Stake'} type={'number'} name={'stake'} 
                
                onChange={e => {
                  
                setStake(e.target.value)}
                
              }
          
               ></Field>
                    
                
                    <Button type='submit'
                   onChange={(e) => setTime(e.target.value)} 
                    >make bet</Button>
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