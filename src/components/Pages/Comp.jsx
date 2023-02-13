import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

import auth from '../../Firebase/firebase';
import SportsMenu from '../Surfaces/SportsMenu';
import MainOdds1 from '../Surfaces/MainOdds1';
import { Box, Grid } from '@mui/material';
import Coupon from '../Surfaces/Coupon';
import { Routes, Switch, Route, NavLink, Router } from "react-router-dom";
import TestOdds from '../Surfaces/TestOdds';

function Comp(props) {
    return (
        <div>
           
             <Box>
                <Grid container spacing={0.5}>
             <Grid xs={2.8}>
             <SportsMenu/>
             </Grid>
             <Grid xs={6}>
             <MainOdds1/>
             </Grid>
             <Grid xs={2}>
             <Coupon/>
             </Grid>
             <TestOdds/>
           </Grid>
           </Box>
          
        </div>



    );
}

export default Comp;