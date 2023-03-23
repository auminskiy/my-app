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


const SportsMenuCopy = (props) => {
    


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
   /* 
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
*/
const clickSport = () => {
  navigate(`/main/${'id'}`)}

  return (
    
    
  <div> 
    <CssBaseline/>
    <Accordion sx={{backgroundColor:'blackSecondaryDark.backgroundColor', color:'blackSecondaryDark.color'}} disableGutters   > 
   

     <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'yellow.backgroundColor'}}/>}
          aria-controls="panel1a-content"
          > 
    
    <Typography  variant="inherit">sport htudlkf</Typography>
          

 </AccordionSummary>
 
        <AccordionDetails>
            <MenuList>
        <MenuItem color="salat">
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
        <Typography onClick={()=>{clickSport()}}   variant="inherit">soccer</Typography>
         
        </MenuItem>
        <Divider sx={{color:'yellow.color'}}/>
        <MenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
        <Typography onClick={()=>{clickSport()}}  variant="inherit">basketball</Typography>
         
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
        <Typography onClick={()=>{clickSport()}}   variant="inherit">water badminton</Typography>
         
        </MenuItem>
        </MenuList>
          </AccordionDetails>
         
  
    </Accordion>
  
    </div>
    
   
  );
}

export default SportsMenuCopy;