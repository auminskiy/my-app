import React from 'react';
import SportsMenu from '../Surfaces/SportsMenu';
import { Box, Grid, Paper} from '@mui/material';
import Coupon from '../Surfaces/Coupon/Coupon';
import MainOdds from '../Surfaces/MainOdds';
import SportsMenuCopy from '../Surfaces/SportsMenuCopy';



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
           */} 
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