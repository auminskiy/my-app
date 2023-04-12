import { collection, getDocs, getFirestore,
    addDoc, onSnapshot, orderBy, serverTimestamp, query, where  } from "firebase/firestore";
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";

 const auth = getAuth();
 const user = auth.currentUser;

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
const colBal = collection(db, 'transactions')
 //const q = query(colRef, orderBy('createdAt'), where('user', "==", `${user.email}`))

/*
 const querySnapshot = await getDocs(filterByUser);
 querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
 });
*/
const currentBalance = (set, get) => ({
    transactions: [],
    snapBalance: onSnapshot(colBal, (snapshot) => {
        let transactions = []
        snapshot.docs.forEach((doc) => {
            transactions.push({...doc.data(), id:doc.id})
        })
        console.log(transactions)
      }),
    async getBalance() {
        const snapshot = await getDocs(colBal);
        const transactions = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        set({transactions});
      }
/*getBalance: async () => {
  await getDocs(colBal)
 .then((snapshot) => {
   let transactions = []
   snapshot.docs.forEach((doc) => {
    transactions.push({...doc.data(), id:doc.id})
     set({transactions: transactions})
   })
   console.log(transactions)
 })
 .catch(err => {
     console.log(err.message)
 })
},*/

/*snapBalance: onSnapshot(colBal, (snapshot) => {
    let transactions = []
    snapshot.docs.forEach((doc) => {
        transactions.push({...doc.data(), id:doc.id})
    })
    console.log(transactions)
  })*/
})


export default currentBalance;
