import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import auth from '../../Firebase/firebase';
import SportsMenu from '../Surfaces/SportsMenu';
import MainOdds from '../Surfaces/MainOdds';
import { Box, Grid } from '@mui/material';
import Coupon from '../Surfaces/Coupon';
import { BrowserRouter, Switch, Route, NavLink, Router } from "react-router-dom";
import Comp from '../Pages/Comp';

const AuthDetails = (props) => {
  
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();
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
   


    const userSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login')
            console.log('sign out successful')
        }).catch(error => {
            console.log(error);
            
        } )
    }

  

    return (
        <div>
            {authUser ? 
            
            <Comp/>
           
             : 
            <div >  
            <LoginForm/> 
            </div>
            }
        </div>
    );
}



export default AuthDetails;