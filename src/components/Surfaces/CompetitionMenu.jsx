import * as React from 'react';
import { useState, useEffect } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { SportsApi } from '../../Api/SportsApi';

const CompetitionMenu = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
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
    let competition = [...new Set(items.map(el => el.title))];
    console.log(competition);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {


  return (<div> 
    <Paper sx={{ width: 230 }}>
      <MenuList > {competition.map(key => {
   return  <MenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <Typography key={key} variant="inherit">{key}</Typography>
        </MenuItem>
          })}
      </MenuList>
    </Paper>
  
    </div>
  );
}
}
export default CompetitionMenu;