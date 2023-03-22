import { collection, getDocs, getFirestore,
    addDoc, onSnapshot, orderBy, serverTimestamp, query, where  } from "firebase/firestore";
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";

 const auth = getAuth();
 const user = auth.currentUser;
 /*if (user !== null) {
   // The user object has basic properties such as display name, email, etc.
   const displayName = user.displayName;
   const email = user.email;
   const photoURL = user.photoURL;
   const emailVerified = user.emailVerified;
 
   // The user's ID, unique to the Firebase project. Do NOT use
   // this value to authenticate with your backend server, if
   // you have one. Use User.getToken() instead.
   const uid = user.uid;
   console.log(user.displayName)
 }
*/

 
 
 
 
 const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
 };
 
 const app = initializeApp(firebaseConfig);

 
 

 
 
 
 initializeApp(firebaseConfig);
 
 
 const db = getFirestore();
 const colRef = collection(db, 'bookmaker')
 //const q = query(colRef, orderBy('createdAt'), where('user', "==", `${user.email}`))

/*
 const querySnapshot = await getDocs(filterByUser);
 querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
 });
*/
const createBet = (set, get) => ({
    bets: [],
getBets: async () => {
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
})

/*
const addBetForm = document.querySelector('.add')
addBetForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, orderBy('createdAt'), {
    market: addBetForm.market.value,
    match: addBetForm.match.value,
    odds: addBetForm.odds.value,
    createdAt: serverTimestamp(),
  })
  .then(() => {
    addBetForm.reset()
  })
})
*/

export default createBet;

