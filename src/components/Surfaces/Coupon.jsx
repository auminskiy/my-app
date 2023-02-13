import { Button, Typography } from '@mui/material';
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
import getName from '../../store/useTeam';
import CouponName from './CouponName';
import useTeam from '../../store/useTeam';


 

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
    

    const [match, setMatch] = useState('');
    const [market, setMarket] = useState('');
    const [time, setTime] = useState('');
   const [message, setMessage] = useState({error: false, msg: ''})
const handleSubmit = async (e) => {
    
    setMessage('');
    if (match === '' || market === '') {
        setMessage({error: true, msg: 'what a fuck?'});
        return;
    }

   const newBet = {match, market, createdAt: serverTimestamp(), user: authUser.email}
   console.log(newBet)

   try {
    await addBet(newBet);
    setMessage({error: false, msg: "bet accepted succesfully!"});
   } catch (err) {
    setMessage({error: true, msg: err.message});
   }
   setMarket('');
   setMatch('');
   setTime('');
   }

   
const addBet = (newBet) => {
    return addDoc(colRef, newBet)
}

const name = useTeam((state) => state.oddsInfo)
console.log(name);




    return (
        <div className={s.coupon}>
            Coupon
            <div> {
              name == 0 
                ?  <div>Choose the market</div>
                : <div>
                <div>{name.map((key) => (
                <div key={key.id}>
                    <Typography>{key.price}</Typography>
                    <Typography>{key.name}</Typography>
                </div>
               ))}
            </div>
            <div>
               <Formik onSubmit={handleSubmit}
               initialValues={{ match: "", market: "" }}
               >
                <Form>
                    <Field value={match} type='text' name='match' 
                onChange={(e) => setMatch(e.target.value)}></Field>
                    <Field value={market} type='text' name='market' 
                onChange={(e) => setMarket(e.target.value)}></Field>
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