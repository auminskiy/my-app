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
      'X-RapidAPI-Key': 'c4fcd901cbmsh7783f382610b146p17eaf3jsnd14a9715a708',
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
    addToMarketInfoList(e.target.getAttribute('data'), e.target.getAttribute('value'), e.target.getAttribute('match') )
    console.log("value: ", e.target.getAttribute('data'), e.target.getAttribute('value'), e.target.getAttribute('match'), );
  }
 



const handleChange = (e) => {
  const name = e.target.getAttribute('data')
  const price = e.target.getAttribute('value')
  console.log("value: ", name, price );
  
 }
 console.log(items); 

 const book =  items.filter((arr) => {
  let newBookmaker = arr.bookmakers.filter(
    (bookmaker) => bookmaker.key == "bovada"
  );
  if (newBookmaker.length > 0) {
    arr.bookmakers = newBookmaker;
    return arr;
  }
});

console.log(book);

 const [open, setOpen] = React.useState(false);

 const handleClick = () => {
   setOpen(!open);
 };
const val = 'bovada';
 const result = items.filter(el => el.bookmakers.key===val)

console.log(result);

 return ( 
  <div variant="inherit">
  <Box sx={{ width: '100%', minHeight: '100vh' }}>
 
<CarouselItem  sx={{
        height: '40vh',
        width: '100%',
       
      }}/>
    <Item sx={{display: 'flex', justifyContent:'flex-start',
    backgroundColor:'greenPrimary.backgroundColor', color:'greenPrimary.color', borderRadius: 0, textTransform: 'capitalize'}}>{sportKeyLoc}</Item>
    { /*
  <Item>{[...new Set(items.map(el => el.sport_title))]}</Item>*/}
 
 {book.map(key => {
    return <div>
     <div key={key.id} variant="inherit">
  <Stack spacing={0.2} sx={{borderRadius: 0}} >
  <Item sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0}}>{key.sport_title}</Item>
            
            <Stack sx={{ width: '100%',}}>
              <Stack direction="row"
sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, }}
justifyContent="center"
alignItems="center"
>
  
  <Typography sx={{color:'yellow.backgroundColor', fontSize:'0.8em', width: '12em', marginLeft: '1em' }}>{key.commence_time}</Typography>
  
    <Typography  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', width: '100%',
    alignItems:"center", display:'flex', justifyContent:'flex-start', borderRadius: 0}}>{key.home_team}{'  ' }vs{ '  '}{key.away_team}
    
    </Typography>
    <ListItemButton sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, }} 
    onClick={() => setOpen((prev) => ({...prev, [key.id]: !prev[key.id]}))}>
        {open ? <ExpandLess /> : <ExpandMore><Typography>&nbsp;+{key.bookmakers[0].markets.length}</Typography></ExpandMore> }
      </ListItemButton>
    
    </Stack>
    
    <Stack
   direction="row"
   divider={<Divider orientation="vertical" flexItem />}
   justifyContent="center"
   alignItems="center"
   marginTop={'0.1em'}
   >
{key.bookmakers[0].markets[0] == undefined ? null : key.bookmakers[0].markets[0].outcomes.map(key => {
   return <Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} match={key.commence_time} data={key.name} value={key.price}  key={key.name} >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}data={'name'} value={'price'} match={'29.11.2323 Spartachek - Tracktor'}>{key.name}</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}data={'name'} value={'price'}>&nbsp;{key.price}</Typography>
  </Item>

 })}
 </Stack>
</Stack>



<Collapse key={key.id} in={open[key.id]} timeout="auto" unmountOnExit>
<List component="div" disablePadding >

{key.bookmakers[0].markets[1] == undefined ? null : key.bookmakers[0].markets[1].outcomes.map((key) => {
<Item  sx={{ backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, alignItems:"center", display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} data={key.name} value={key.price}  key={key.name} >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis', }}>{key.key}</Typography>
  </Item>
})}
  <Stack
direction="row"
divider={<Divider orientation="vertical" flexItem />}
justifyContent="center"
alignItems="center"

>
{key.bookmakers[0].markets[1] == undefined ? null : key.bookmakers[0].markets[1].outcomes.map((k) => {
<Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} data={k.name} value={k.price}  key={k.name} >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>{k.name}</Typography>
  <Typography sx={{fontSize:'0.9em' }}>&nbsp;{k.point}</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;{k.price}</Typography>
  </Item>
})}
</Stack>

<Item  sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, alignItems:"center", display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} data={key.name} value={key.price}  key={key.name} >
  <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis' }}>{key.key}</Typography>
  </Item>
<Stack
direction="row"
divider={<Divider orientation="vertical" flexItem />}
justifyContent="center"
alignItems="center"
>
{key.bookmakers[0].markets[2] == undefined ? null : key.bookmakers[0].markets[2].outcomes.map((key) => {
<Item  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} data={key.name} value={key.price}  key={key.name} >
  
  <Typography sx={{fontSize:'0.9em' }}>{key.name}</Typography>
  <Typography sx={{fontSize:'0.9em' }}>&nbsp;{key.point}</Typography>
  <Typography sx={{color:'yellow.backgroundColor'}}>&nbsp;{key.price}</Typography>
  </Item>
})}
</Stack>

</List>
</Collapse>


</Stack>

</div>
 </div> 
})}
</Box>
  </div>


  
)
}


export default MainOddsAccordion