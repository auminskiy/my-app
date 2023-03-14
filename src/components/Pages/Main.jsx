import { Container } from '@mui/material';
import React from 'react';
import { SportsApi } from '../../Api/SportsApi';
import AuthDetails from '../Auth/AuthDetails';
import Header from '../Surfaces/Header';
import SportsMenu from '../Surfaces/SportsMenu';



const Main = (props) => {

    return(
   <div>
     <Header />
    
    <AuthDetails/>
    
   
   </div>
    )
}

export default Main;