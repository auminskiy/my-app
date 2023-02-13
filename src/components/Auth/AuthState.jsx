import { onAuthStateChanged } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import AuthDetails from './AuthDetails';
import auth from '../../Firebase/firebase';

import { useSelector } from "react-redux";

export const AuthState = () => {
    const {email, token, id} = useSelector(state => state.user);
    return {
        isAuth: !!email,
        email,
        token,
        id,
    }
}