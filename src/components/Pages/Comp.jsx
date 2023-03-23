import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

import auth from '../../Firebase/firebase';
import SportsMenu from '../Surfaces/SportsMenu';
import MainOdds1 from '../Surfaces/MainOdds1';
import { Box, CssBaseline, Grid} from '@mui/material';
import Coupon from '../Surfaces/Coupon';
import Coupon1 from '../Surfaces/Coupon1';
import { Routes, Switch, Route, NavLink, Router } from "react-router-dom";
import TestOdds from '../Surfaces/TestOdds';
import MainOdds from '../Surfaces/MainOdds';
import SportsMenuCopy from '../Surfaces/SportsMenuCopy';


function Comp(props) {
    return (
      
        <div style={{height:'100%'}}>
           
             <Box sx={{backgroundColor:'blackSecondary.backgroundColor', color:'blackSecondary.color', }}>
                <Grid container spacing={0}>
             <Grid xs={2.5} >
              
             <SportsMenuCopy />
             
             </Grid>
             <Grid xs={7}>
              
           {/*<MainOdds1/>*/}  
           <MainOdds />
           
             </Grid>
             <Grid xs={2.5}>
             
             <Coupon/>
           
             </Grid>
            
           </Grid>
           </Box>
          
        </div>

       

    );
}

export default Comp;