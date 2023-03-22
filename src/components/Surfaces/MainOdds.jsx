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


  return ( <div> <Item>Top matches</Item>
    <div variant="inherit">
    <Box sx={{ width: '100%' }}>
    <Stack spacing={2}>
  <Item>{'sport_title'}</Item>
  <Item>{'home_team'}{'  ' }vs{ '  '}{'away_team'}</Item>
  <Item>{'home_team'}{'  ' }vs{ '  '}{'away_team'}</Item>
  <Item>{'home_team'}{'  ' }vs{ '  '}{'away_team'}</Item>
  <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={5}
  justifyContent="space-around"
>
  
    <Item onClick={handleAddTeam} data={'spartor'} value={'3'}>{'spartor'} {'   '}  {'3'}</Item>
    <Item onClick={handleAddTeam} data={'free'} value={'4'}>{'key.name'} {'   '}  {'4'}</Item>
    <Item onClick={handleAddTeam} data={'tracktor'} value={'2.5'}>{'key.name'} {'   '}  {'2.5'}</Item>
  </Stack>
  </Stack>
 
  </Box>
    </div>

  
    </div>
  )
}


export default MainOdds