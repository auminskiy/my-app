import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { Routes, useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import auth from '../../Firebase/firebase';
import SportsMenu from '../Surfaces/SportsMenu';
import MainOdds from '../Surfaces/MainOdds';
import { Box, Grid } from '@mui/material';
import Coupon from '../Surfaces/Coupon';
import { BrowserRouter, Switch, Route, NavLink, Router } from "react-router-dom";
import Comp from '../Pages/Comp';
import Profile from '../Profile/Profile';
import Bets from '../Profile/Bets';
import ProfileInfo from '../Profile/ProfileInfo';

const AuthDetails = (props) => {
  
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
   
   
    return (
        <div>
            {authUser ? 
           <Routes>
            <Route  path="/main/*" element={<Comp/>}/>
      <Route  path="/lc/*" element={<Profile/>}/>
     
            </Routes>
             : 
            <div >  
            <LoginForm/> 
            </div>
            }
        </div>
    );
}



export default AuthDetails;