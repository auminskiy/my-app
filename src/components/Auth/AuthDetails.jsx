import { onAuthStateChanged } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { Routes, useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import auth from '../../Firebase/firebase';
import {Route,} from "react-router-dom";
import MainComponents from '../Pages/MainComponents';
import Profile from '../Profile/Profile';


const AuthDetails = (props) => {
  
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
                navigate('/main/soccer')
            }
            else {
                setAuthUser(null);
            }

        });
        return () => {
            listen();
        }
    }, []);
   
 
   
    return (
        <div>
            {authUser ? 
           <Routes>
            <Route  path="/main/*" element={<MainComponents/>}/>
      <Route  path="/lc/*" element={<Profile/>}/>
            </Routes>
             : 
            <div > 
                <Routes>
            <Route path="/*" element={<LoginForm/>}/>
            </Routes>
            </div>
            }
        </div>
    );
}



export default AuthDetails;