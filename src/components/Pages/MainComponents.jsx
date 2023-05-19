import React from 'react';
import SportsMenu from '../Surfaces/SportsMenu';
import { Box, Grid, Menu, Paper, SwipeableDrawer} from '@mui/material';
import Coupon from '../Surfaces/Coupon/Coupon';
import MainOdds from '../Surfaces/MainOdds';
import Coupon1 from '../Surfaces/Coupon/Coupon1';


function MainComponents(props) {

 // const toggleOpen = useStore((state) => state.toggleOpen)
 // const open = useStore((state) => state.open)

    return (
      
        <Paper sx={{minHeight: '100vh', width: '100vw', marginTop: {xs: 7, md: 8}}}>
           
             <Box sx={{backgroundColor:'blackSecondary.backgroundColor', color:'blackSecondary.color', }}>
                <Grid container spacing={0}>
             <Grid sx={{display: {md: 'flex', xs: 'none'}}} md={2} >
             <SportsMenu />
            
             </Grid>
             <Grid md={7} xs={12}>
            
            <MainOdds />
             </Grid>
             <Grid sx={{display: {md: 'flex', xs: 'none'}}} md={3}  >
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

export default MainComponents;