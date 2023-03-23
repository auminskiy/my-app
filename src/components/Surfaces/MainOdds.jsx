import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect, useRef } from 'react';
import { competitionOddsApi, upcomingOddsApi } from '../../Api/SportsApi';
import { Alert, Divider, ImageListItem, Stack, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create } from 'zustand';

import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

import useStore from '../../store/useStore';
import CarouselItem from './Carousel/CarouselItem';


 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const MainOdds= () => {


  const instance = axios.create({
    params: {
      regions: 'us',
      oddsFormat: 'decimal',
      markets: 'h2h,spreads,totals',
      dateFormat: 'iso'
    },
    headers: {
      'X-RapidAPI-Key': 'fbe24cc43dmsh015584980782e3ep1bd677jsn4e3515cba58f',
      'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
   })
  
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [items, setItems] = useState([]);
  
  
   const competitionOddsApi = () => {
    instance.get(`https://odds.p.rapidapi.com/v4/sports/${sportKeyLocation}/odds`)
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          console.log(result.data)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
}



const location = useLocation();
const sportKey = location.pathname;
const sportKeyLoc = sportKey.split('/')[2]
const [sportKeyLocation, setSportKeyLocation] = useState(sportKeyLoc);
console.log(location.pathname.split('/')[2]);
console.log(sportKeyLoc);
// И создать 2 useEffect

  useEffect(() => { // Вызывает апи при изменении sportKeyLocation
    //  upcomingOddsApi()
    competitionOddsApi();
  }, [sportKeyLocation]);

  useEffect(() => { // Сохраняет новый URL в переменную
    setSportKeyLocation(sportKeyLoc)
  }, [sportKeyLoc]);

const addToMarketInfoList = useStore((state) => state.addToMarketInfoList);
const handleAddTeam = (e) => {
  addToMarketInfoList(e.target.getAttribute('data'), e.target.getAttribute('value') )
  console.log("value: ", e.target.getAttribute('data'), e.target.getAttribute('value') );
}


  return ( 
    <div variant="inherit">
    <Box sx={{ width: '100%' }}>
    {/* <Box  component="img"
        sx={{
          height: '18em',
          width: '100%',
         
        }} 
      src={'https://www.minnpost.com/wp-content/uploads/2022/08/SportsBettingBoard940.png?fit=940%2C482&strip=all'}></Box>
*/}
<CarouselItem  sx={{
          height: '40vh',
          width: '100%',
         
        }}/>
      <Item sx={{display: 'flex', justifyContent:'flex-start',
      backgroundColor:'greenPrimary.backgroundColor', color:'greenPrimary.color', borderRadius: 0, textTransform: 'capitalize'}}>{sportKeyLocation}</Item>
    <Stack spacing={2} sx={{borderRadius: 0}}>
      
  <Item sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0}}>{'sport_title'}</Item>
  <Item sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0}}>{'home_team'}{'  ' }vs{ '  '}{'away_team'}</Item>
  <Item sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0}}>{'home_team'}{'  ' }vs{ '  '}{'away_team'}</Item>
  <Item>{'home_team'}{'  ' }vs{ '  '}{'away_team'}</Item>
  <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  
  justifyContent="space-around"
>
  
    <Item sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0}} onClick={handleAddTeam} data={'spartor'} value={'3'}>{'spartor'} {'   '}  {'3'}</Item>
    <Item sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0}} onClick={handleAddTeam} data={'free'} value={'4'}>{'key.name'} {'   '}  {'4'}</Item>
    <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0}}onClick={handleAddTeam} data={'tracktor'} value={'2.5'}>{'key.name'} {'   '}  {'2.5'}</Item>
  </Stack>
  </Stack>
 
  </Box>
    </div>

  
    
  )
}


export default MainOdds