import React from 'react';
import SportsMenu from '../Surfaces/SportsMenu';
import { Box, Grid, Menu, Paper, SwipeableDrawer} from '@mui/material';
import Coupon from '../Surfaces/Coupon/Coupon';
import MainOdds from '../Surfaces/MainOdds';
import SportsMenuCopy from '../Surfaces/SportsMenuCopy';
import MainOdds1 from '../Surfaces/MainOdds1';
import useStore from '../../store/useStore';
import Coupon1 from '../Surfaces/Coupon/Coupon1';


function Comp(props) {

  const toggleOpen = useStore((state) => state.toggleOpen)
  const open = useStore((state) => state.open)

  


    return (
      
        <Paper sx={{minHeight: '100vh', width: '100vw', marginTop: '5vh'}}>
           
             <Box sx={{backgroundColor:'blackSecondary.backgroundColor', color:'blackSecondary.color', }}>
                <Grid container spacing={0}>
             <Grid sx={{display: {md: 'flex', xs: 'none'}}} md={2.5} >
             <SportsMenu />
            
             </Grid>
             <Grid md={7} xs={12}>
             {/* 
           <MainOdds1/> 
           <MainOdds />
           */} 
            <MainOdds />
             </Grid>
             <Grid sx={{display: {md: 'flex', xs: 'none'}}} md={2.5}  >
             <Coupon1 />
             
             </Grid>
             <Grid sx={{display: {md: 'none', xs: 'flex', }}}  xs={12} >
             <Coupon />
             
             </Grid>
            
             
           </Grid>
           </Box>
          
        </Paper>

       

    );
}

export default Comp;