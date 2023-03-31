import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

import auth from '../../Firebase/firebase';
import SportsMenu from '../Surfaces/SportsMenu';
import MainOdds1 from '../Surfaces/MainOdds1';
import { Box, CssBaseline, Grid, Paper} from '@mui/material';
import Coupon from '../Surfaces/Coupon/Coupon';
import Coupon1 from '../Surfaces/Coupon/Coupon1';
import { Routes, Switch, Route, NavLink, Router } from "react-router-dom";
import TestOdds from '../Surfaces/TestOdds';
import MainOdds from '../Surfaces/MainOdds';
import SportsMenuCopy from '../Surfaces/SportsMenuCopy';
import MainOddsAccordion from '../Surfaces/MainOddsAccordion';


function Comp(props) {
    return (
      
        <Paper sx={{minHeight: '100vh'}}>
           
             <Box sx={{backgroundColor:'blackSecondary.backgroundColor', color:'blackSecondary.color', }}>
                <Grid container spacing={0}>
             <Grid xs={2.5} >
              
             <SportsMenu />
             
             </Grid>
             <Grid xs={7}>
             {/* 
           <MainOdds1/> 
           <MainOdds />
           <MainOddsAccordion/>*/} 
            <MainOdds />
             </Grid>
             <Grid xs={2.5}>
             
             <Coupon/>
           
             </Grid>
            
           </Grid>
           </Box>
          
        </Paper>

       

    );
}

export default Comp;