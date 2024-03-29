
import { collection, getDocs, getFirestore,
   addDoc, onSnapshot, orderBy, serverTimestamp, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";




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
//const q = query(colRef, orderBy('createdAt'), where('user', "==", 'tjfox24@yandex.ru'))
const colUser = collection(db, 'transactions');
class DataService {
  



//test getData
addBets = (newBet) => {
  return addDoc(colRef, newBet)
}

//add new user
addUser = (newUser) => {
  return addDoc(colUser, newUser)
}


//data
 getDataBets = getDocs(colRef)
.then((snapshot) => {
  let bookmaker = []
  snapshot.docs.forEach((doc) => {
    bookmaker.push({...doc.data(), id:doc.id})
  })
  console.log(bookmaker)
})
.catch(err => {
    console.log(err.message)
})


//realtime data



dataTransactions = onSnapshot(colUser, (snapshot) => {
  let transactions = []
  snapshot.docs.forEach((doc) => {
    transactions.push({...doc.data(), id:doc.id})
  })
  console.log(transactions)
})


//


dataBets = onSnapshot(colRef, (snapshot) => {
  let bookmaker = []
  snapshot.docs.forEach((doc) => {
    bookmaker.push({...doc.data(), id:doc.id})
  })
  console.log(bookmaker)
})
/*
const addBet = document.querySelector('.add')
addBetForm.addEventListener('submit', (e) => {
  e.preventDefault()
 
  addBet = 
  addDoc(colRef, orderBy('createdAt'), {
    market: addBet.market.value,
    match: addBet.match.value,
    odds: addBet.odds.value,
    createdAt: serverTimestamp(),
  })
  .then(() => {
    addBet.reset()
  })*/
}
  export default new DataService();