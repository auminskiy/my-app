import datas from "../Firebase/firestore"

import { collection, getDocs, getFirestore,
  addDoc, onSnapshot, orderBy, serverTimestamp, query, where } from "firebase/firestore";
 import { initializeApp } from "firebase/app";
import useStore from "./useStore";
import { onAuthStateChanged} from 'firebase/auth';
import auth from '../Firebase/firebase';
 
 
 
 
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
const colRef = collection(db, 'bookmaker')
//const colRef = db.collection('bookmaker').where('user', '==', 'tjfox24@ggg.com')
 const filterByUser = query(colRef, where('user', '===', 'tjfox24@ggg.com'))
 


const createOddsSlice = (set, get) => ({
    bets: [],
    getsBets: async () => {
      await getDocs(filterByUser)
     .then((snapshot) => {
       let bookmaker = []
       snapshot.docs.forEach((doc) => {
         bookmaker.push({...doc.data(), id:doc.id})
         set({bets: bookmaker})
       })
       
       console.log(bookmaker)
     })
     .catch(err => {
         console.log(err.message)
     })
    },
/*getBets: async () => {
  await getDocs(colRef)
 .then((snapshot) => {
   let bookmaker = []
   snapshot.docs.forEach((doc) => {
     bookmaker.push({...doc.data(), id:doc.id})
     set({bets: bookmaker})
   })
   
   console.log(bookmaker)
 })
 .catch(err => {
     console.log(err.message)
 })
},
*/

})


export default createOddsSlice;

