import * as React from 'react';
import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import getDataBets from '../../Firebase/firestore';

import { collection, getDocs, getFirestore,
    addDoc, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
 import { initializeApp } from "firebase/app";
import { render } from '@testing-library/react';
 
 
 
 
 
 const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
 };
 
 
 

const TestOdds = (props) => {
  /*  const [data, setData] = useState([])

    useEffect(() => {
        getDataBets()
        console.log();
    }, [])
    */
  /* 
    const [bookmaker, loading] = useCollectionData(
    firebase.collection('bookmaker')
        )
    if (loading) {
        return <div>123</div>
    }
*/
  

const bets = useStore((state) => state.bets);
const getBets = useStore((state) => state.getBets);



React.useEffect(() => {
    getBets();
}, [getBets]);

console.log(bets)
const betsOdds = []
bets.forEach(el => {
  for (let i in el.bets) {
    if (!betsOdds.find(it => el.bets[i].market === it.market))
    betsOdds.push(el.bets[i])
  }
})
console.log(betsOdds)
    return (
       
            <ul> 
             {betsOdds.map((bet)=>(
                <li key={bet.id}>{bet.market}</li>
             )
             )}
              
            </ul>

              
                 
    );
}

export default TestOdds;