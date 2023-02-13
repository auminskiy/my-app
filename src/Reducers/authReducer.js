import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import auth from '../../Firebase/firebase';

const SET_USER_DATA = 'SET_USER_DATA';



let initialState = {
  
    user: null,
    email: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {

switch (action.type) {
    case SET_USER_DATA:
 
    return {
        ...state,
        ...action.data,
       
        }
    
    default:
    return state;
}
}

export const setAuthUserData = (user, email, isAuth) => ({type: SET_USER_DATA, data: {user, email, isAuth}})

export const authProfile = () => async (dispatch) => {
     let response = await authClientProfile(); 
            console.log(response.data)
           if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
           }
}


export const login = (email, password, rememberMe, setStatus) =>  async (dispatch) => {
        let response = await clientLogin(email, password, rememberMe) 
            console.log(response.data)
           if (response.data.resultCode === 0) {
          
            dispatch(authProfile());
           }  else {
            setStatus(response.data.messages) 
        }
}


export const logout = () => async (dispatch) => {
    let response = await clientLogout() 
            console.log(response.data)
           if (response.data.resultCode === 0) {
          
            dispatch(setAuthUserData(null, null, null, false));
           }  
}



export default authReducer;