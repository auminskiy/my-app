import * as React from 'react';
import { useState, useEffect } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';

import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { SportsApi } from '../../Api/SportsApi';
import CompetitionMenu from './CompetitionMenu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
import MainOdds from './MainOdds';
import { CssBaseline, Divider, Grid } from '@mui/material';
import SimpleBar from 'simplebar-react';



const SportsMenu = (props) => {
    


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
   
    const navigate = useNavigate();
    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
      SportsApi()
       
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
    
    let sports = [...new Set(items.map(el => el.group))];
    console.log(sports);
   
    let competitionFiltered = items.filter(elem=>elem.group===sports[2])
    let competitions = [...new Set(competitionFiltered.map(el => el.title))];
    console.log(competitionFiltered)
    console.log(competitions)

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {


  }

  

  return (<Paper> 
    
  <CssBaseline/>  {sports.map(key => {
    return <Accordion sx={{backgroundColor:'blackSecondaryDark.backgroundColor', color:'blackSecondaryDark.color'}} disableGutters   >  
   
  
   <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'yellow.backgroundColor'}}/>}
          aria-controls="panel1a-content"
          >
    
    <Typography key={key.id} variant="inherit">{key}</Typography>
          

 </AccordionSummary>
 {items.filter(elem=>elem.group===key).map(id => {
  const clickSport = () => {
    navigate(`/main/${id.key}`)
  }
        return  <AccordionDetails sx={{backgroundColor: 'blackSL.backgroundColor', color:'blackSL.color' }}>
            <MenuList >
        <MenuItem sx={{maxHeight: '0.5em', borderColor: 'red', border: '1em'}}>
          
        <Typography  sx={{fontSize: '0.9em'}}onClick={()=>{clickSport()}} id={id}  variant="inherit">{id.title}</Typography>
       
        </MenuItem>
      
        </MenuList>
          </AccordionDetails>
         })} 
 
    </Accordion>
  })}
    
    </Paper>
  );
}

export default SportsMenu;