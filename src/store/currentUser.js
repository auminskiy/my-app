import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../Firebase/firebase';


const currentUser = (set, get) => ({
user: [],
getUser:  async () => {
    const [authUser, setAuthUser] = useState(null);
    
  useEffect(() => {
    
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
                
                set({user: authUser})
                console.log(user)
            }
            else {
                setAuthUser(null);
            }
  
        });
        return () => {
            listen();
        }
    }, []);
    
}

}
)





export default currentUser;