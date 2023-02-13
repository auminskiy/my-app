import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from 'react';
import { competitionOddsApi, upcomingOddsApi } from '../../Api/SportsApi';
import { Divider, Stack} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const MainOdds = () => {


  const instance = axios.create({
    params: {
      regions: 'eu',
      oddsFormat: 'decimal',
      markets: 'h2h,spreads,totals',
      dateFormat: 'iso'
    },
    headers: {
      'X-RapidAPI-Key': '9abf5ca07emsh13a40cd970ee88ep1cc97cjsn5bc7c4cb6e9d',
      'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
   })
  
   const location = useLocation();
   const sportKeyLocation = location.pathname;
   const sportKeyLocationMain = sportKeyLocation.split('/')[2];
   console.log(sportKeyLocationMain);
  
  
  
  const competitionOddsApi = () => {
    
     
    return instance.get(`https://odds.p.rapidapi.com/v4/sports/${sportKeyLocationMain}/odds`)
    .then(response => {
      console.log(response.data)
      
      return response.data;
      
    })
  }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

 
  
    
    useEffect(() => {
    //  upcomingOddsApi()
    competitionOddsApi()
       
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
            console.log(result);
           
          },
          
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
    

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
  
  
    }
  
console.log(items);


  return ( <div> <Item>Top matches</Item>
     {items.map(key => {
    return <div key={key.id} variant="inherit">
    <Box sx={{ width: '100%' }}>
    <Stack spacing={2}>
  <Item>{key.sport_title}</Item>
  <Item>{key.home_team}{'  ' }vs{ '  '}{key.away_team}</Item>
  <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={5}
  justifyContent="space-around"
>
  {key.bookmakers[0].markets[0].outcomes.map(key => {
    return <Item key={key.id}>{key.name} {'   '}  {key.price}</Item>
  })}
  </Stack>
  </Stack>
 
  </Box>
    </div>

  })}
    </div>
  )
}


export default MainOdds