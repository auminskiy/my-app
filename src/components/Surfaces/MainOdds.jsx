import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useRef } from 'react';
import { Alert, Collapse, Divider, ImageListItem, List, ListItemButton, Stack, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../store/useStore';
import CarouselItem from './Carousel/CarouselItem';
import { ExpandLess, ExpandMore, } from '@mui/icons-material';
import moment from 'moment/moment';

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
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
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


  useEffect(() => {
    competitionOddsApi();
  }, [sportKeyLocation]);

  useEffect(() => { 
    setSportKeyLocation(sportKeyLoc)
  }, [sportKeyLoc]);

const addToMarketInfoList = useStore((state) => state.addToMarketInfoList);
const handleAddTeam = (e) => {
  addToMarketInfoList(e.target.getAttribute('data'), e.target.getAttribute('value'), e.target.getAttribute('point'), e.target.getAttribute('match'))
  console.log("value: ", e.target.getAttribute('data'), e.target.getAttribute('value'), e.target.getAttribute('point'), e.target.getAttribute('match') );
}

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





  return ( 
    <div variant="inherit">
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
   
<CarouselItem  sx={{
          height: '40vh',
          width: '100%',
         
        }}/>
      <Item sx={{display: 'flex', justifyContent:'flex-start',
      backgroundColor:'greenPrimary.backgroundColor', color:'greenPrimary.color', borderRadius: 0, textTransform: 'capitalize'}}>{sportKeyLocation.replace(/[^a-zа-яё\s]/gi, ' ')}</Item>
      
   {
    book.length===0 ? <div>no upcoming matches</div> :
   <div>
     {book.map(key => {
       return <div>
       <div key={key.id} variant="inherit">
    <Stack spacing={0.2} sx={{borderRadius: 0}}>
      
  <Item sx={{backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0}}>{key.sport_title}</Item>
  
  <Stack direction="row"
   justifyContent="center"
   alignItems="center"
   sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, }}>
   
   <Typography sx={{color:'yellow.backgroundColor', fontSize:'0.8em', width: '12em', marginLeft: '1em' }}>{moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
  
  <Typography  sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', width: '100%',
  alignItems:"center", display:'flex', justifyContent:'flex-start', borderRadius: 0}}>{key.home_team}{'  ' }vs{ '  '}{key.away_team}
  
  </Typography>
  {open[key.id] ? null  : <Typography>&nbsp;{key.bookmakers[0].markets.length -1=== 0 ? null : (key.bookmakers[0].markets.length -1)}</Typography>}
  <ListItemButton sx={{backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, }} onClick={() => setOpen((prev) => ({...prev, [key.id]: !prev[key.id]}))}>
        {open[key.id]  ? <ExpandLess /> : (key.bookmakers[0].markets.length -1=== 0 ? null : <ExpandMore />)}
      </ListItemButton>
      
      </Stack>
  <Stack
   direction="row"
   divider={<Divider orientation="vertical" flexItem />}
   justifyContent="center"
   alignItems="center"
   
 >
{key.bookmakers[0].markets[0] == undefined ? null : key.bookmakers[0].markets[0].outcomes.map((k, index) => {
   return <Item  sx={{ cursor: 'pointer', backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={k.name} value={k.price} point={k.point} key={index} >
    <Typography sx={{ cursor: 'pointer', fontSize:'0.9em', textOverflow: 'ellipsis' }}match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={k.name} value={k.price} point={k.point} >{k.name}</Typography>
    <Typography sx={{ cursor: 'pointer', color:'yellow.backgroundColor'}}match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={k.name} value={k.price} point={k.point} >&nbsp;{k.price}</Typography>
    <Typography sx={{ cursor: 'pointer', color:'yellow.backgroundColor'}}match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={k.name} value={k.price} point={k.point} >&nbsp;{k.point}</Typography>
    </Item>
    
  })}
  </Stack>
  <Collapse in={open[key.id]} timeout="auto" unmountOnExit>
  <List  component="div" disablePadding>
  {key.bookmakers[0].markets[1] == undefined ? null :
   <Item  sx={{ backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, alignItems:"center", display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} data={key.name} value={key.price}  key={key.name} >
     <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis', }}>{key.bookmakers[0].markets[1].key}</Typography>
     </Item>}
     <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  justifyContent="center"
  alignItems="center"
  
>
     {key.bookmakers[0].markets[1] == undefined ? null : key.bookmakers[0].markets[1].outcomes.map((q, index) => {
   return <Item  sx={{ cursor: 'pointer', backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={q.name} value={q.price} point={q.point} key={index} >
    <Typography sx={{ cursor: 'pointer', fontSize:'0.9em', textOverflow: 'ellipsis' }} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={q.name} value={q.price} point={q.point} >{q.name}</Typography>
    <Typography sx={{ cursor: 'pointer', fontSize:'0.9em' }} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={q.name} value={q.price} point={q.point} >&nbsp;{q.point}</Typography>
    <Typography sx={{ cursor: 'pointer', color:'yellow.backgroundColor'}} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={q.name} value={q.price} point={q.point} >&nbsp;{q.price}</Typography>
    </Item>
    
     })}
     </Stack>
     {key.bookmakers[0].markets[2] == undefined ? null :
     <Item  sx={{ backgroundColor:'greyPrimary.backgroundColor', color:'greyPrimary.color', borderRadius: 0, alignItems:"center", display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam} data={key.name} value={key.price}  key={key.name} >
     <Typography sx={{fontSize:'0.9em', textOverflow: 'ellipsis', }}>{key.bookmakers[0].markets[2].key}</Typography>
     </Item>}
    
     <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  justifyContent="center"
  alignItems="center"
  
>
     {key.bookmakers[0].markets[2] == undefined ? null : key.bookmakers[0].markets[2].outcomes.map((u, index) => {
   return <Item  sx={{ cursor: 'pointer', backgroundColor:'blackSL.backgroundColor', color:'blackSL.color', borderRadius: 0, alignItems:"center", width: '100%', display:'flex', justifyContent: 'flex-start'}} onClick={handleAddTeam}match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={u.name} point={u.point} value={u.price}  key={index} >
    <Typography sx={{ cursor: 'pointer', fontSize:'0.9em', textOverflow: 'ellipsis' }} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={u.name} value={u.price} point={u.point} >{u.name}</Typography>
    <Typography sx={{ cursor: 'pointer', fontSize:'0.9em' }} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={u.name} value={u.price} point={u.point} >&nbsp;{u.point}</Typography>
    <Typography sx={{ cursor: 'pointer', color:'yellow.backgroundColor'}} match={moment(key.commence_time).format('MMMM Do YYYY, h:mm:ss a')+' '+key.home_team+' '+'vs'+' '+key.away_team} data={u.name} value={u.price} point={u.point}>&nbsp;{u.price}</Typography>
    </Item>
    
     })}
     </Stack>
    </List>
    </Collapse>
  
  </Stack>

 
  
  </div>
   </div> 
  })}
  </div>
}
  </Box>
    </div>

  
    
  )
}


export default MainOdds