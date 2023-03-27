import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect, useRef } from 'react';
import { competitionOddsApi, upcomingOddsApi } from '../../Api/SportsApi';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Collapse, Divider, List, ListItemButton, Stack, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import axios from 'axios';
import { create } from 'zustand';

import { ExpandLess, ExpandMore, SettingsInputAntennaTwoTone } from '@mui/icons-material';

import useStore from '../../store/useStore';
import CarouselItem from './Carousel/CarouselItem';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const MainOddsAccordion = () => {


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

 const [open, setOpen] = React.useState(false);

 const handleClick = () => {
   setOpen(!open);
 };

 return ( 
  <div variant="inherit">
  <Box sx={{ width: '100%', minHeight: '100vh' }}>
 
<CarouselItem  sx={{
        height: '40vh',
        width: '100%',
       
      }}/>
    <Item sx={{display: 'flex', justifyContent:'flex-start',
    backgroundColor:'greenPrimary.backgroundColor', color:'greenPrimary.color', borderRadius: 0, textTransform: 'capitalize'}}>{sportKeyLocation}</Item>
    { /*
  <Item>{[...new Set(items.map(el => el.sport_title))]}</Item>*/}
 
   
    <div>
     <div  variant="inherit">
  <Stack spacing={0.2} sx={{borderRadius: 0}} >
  <Item sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0}}>Germany championship</Item>
            <List>
            <Stack sx={{ width: '100%',}}>
              <Stack direction="row"
sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, }}
justifyContent="center"
alignItems="center"
>
    <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', width: '100%', borderRadius: 0}}>{'key.home_team'}{'  ' }vs{ '  '}{'key.away_team'}
    
    </Item>
    <ListItemButton sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, }} onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    
    </Stack>
    <Stack
direction="row"
divider={<Divider orientation="vertical" flexItem />}
justifyContent="center"
alignItems="center"

>

 <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>Shalke 034234 fc</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.89</Typography>
  </Item>
  <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>Shalke 034234 fc</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.89</Typography>
  </Item>
  <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>Shalke 034234 fc</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.89</Typography>
  </Item>

</Stack>
</Stack>



<Collapse in={open} timeout="auto" unmountOnExit>
<List component="div" disablePadding>

<Item  sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>handicap</Typography>
  </Item>
  <Stack
direction="row"
divider={<Divider orientation="vertical" flexItem />}
justifyContent="center"
alignItems="center"

>
<Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>handicap</Typography>
  <Typography sx={{fontSize:'0.9em' }}>-0.5</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.34</Typography>
  </Item>
  <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >

  <Typography sx={{fontSize:'0.9em' }}>+0.5</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.34</Typography>
  </Item>
</Stack>
<Item  sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>total</Typography>
  </Item>
<Stack
direction="row"
divider={<Divider orientation="vertical" flexItem />}
justifyContent="center"
alignItems="center"

>
 
<Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >
  
  <Typography sx={{fontSize:'0.9em' }}>under</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.99</Typography>
  </Item>
  <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} /*data={key.name} value={key.price}  key={key.name}*/ >

  <Typography sx={{fontSize:'0.9em' }}>over</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;1.88</Typography>
  </Item>
</Stack>
</List>
</Collapse>
</List>
</Stack>

</div>
 </div> 

</Box>
  </div>


  
)
}


export default MainOddsAccordion