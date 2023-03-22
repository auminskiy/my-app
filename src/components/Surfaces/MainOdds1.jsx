import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect, useRef } from 'react';
import { competitionOddsApi, upcomingOddsApi } from '../../Api/SportsApi';
import { Alert, Divider, Stack, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create } from 'zustand';

import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

import useStore from '../../store/useStore';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const MainOdds1 = () => {


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

  //const addTeam = ordinar((state) => state.addTeam);
const addToMarketInfoList = useStore((state) => state.addToMarketInfoList);
  const handleAddTeam = (e) => {
    addToMarketInfoList(e.target.getAttribute('data'), e.target.getAttribute('value') )
    console.log("value: ", e.target.getAttribute('data'), e.target.getAttribute('value') );
  }
 



const handleChange = (e) => {
  const name = e.target.getAttribute('data')
  const price = e.target.getAttribute('value')
  console.log("value: ", name, price );
  
 }
 console.log(items);
  return ( 
  <div> 
    
    <Item>Top matches</Item>
    { 
    <Item>{[...new Set(items.map(el => el.sport_title))]}</Item>}
   
     {items.map(key => {
    return <div>
    <div key={key.id} variant="inherit">
    <Box sx={{ width: '100%' }}>
    <Stack spacing={2}>
  
  <Item>{'key.home_team'}{'  ' }vs{ '  '}{'key.away_team'}</Item>
  <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={5}
  justifyContent="space-around"
>
  {key.bookmakers[0].markets[0].outcomes.map(key => {

    
    return <Item onClick={handleAddTeam} data={key.name} value={key.price}  key={key.id} > 
      {'spartek'}{' '}{'1.44'}
     </Item>
  })}
  </Stack>
  </Stack>
 
  </Box>
    </div>
    </div>
  })}
    </div>
  )
}


export default MainOdds1