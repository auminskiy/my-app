import * as React from 'react';
import { useState, useEffect } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { SportsApi } from '../../Api/SportsApi';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, CircularProgress, CssBaseline, ListItemButton, Menu, } from '@mui/material';



const SportsMenu = (props) => {
    


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
   
    const navigate = useNavigate();
    
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
    return <div><CircularProgress sx={{color: 'yellow', display: 'flex', justifyContent: 'center', alignItems:'center'}}/></div>;
  } else {


  }

 
  return (
    
    <Paper sx={{backgroundColor:'blackSecondary.backgroundColor',}}> 
  <CssBaseline/>  {sports.map(key => {
    return <Accordion sx={{backgroundColor:'blackSecondaryDark.backgroundColor', color:'blackSecondaryDark.color',  }} disableGutters  >  
   
  
   <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'yellow.backgroundColor', }}/>}
          aria-controls="panel1a-content"
          >
    
    <Typography key={key.id} variant="inherit">{key}</Typography>
          

 </AccordionSummary>
 <div style={{maxHeight: '30vh', overflow:'auto'}}>
 {items.filter(elem=>elem.group===key).map(id => {
  const clickSport = () => {
    navigate(`/main/${id.key}`)
  }
        return  <AccordionDetails sx={{backgroundColor: 'blackSL.backgroundColor', color:'blackSL.color', boxShadow: "none", border: 'none'}}  elevation={0}>
           
         
          <Button id={id} selected={selectedIndex === id.title} onClick={(event) => {handleListItemClick(event, id.title); clickSport()} }
          sx={{fontSize: '0.7em', display:'flex', justifyContent:'start', color: selectedIndex===id.title ? 'yellow.backgroundColor': 'blackSL.color',
          
      
      }}   >
        {id.title}
       </Button>
        
       
          </AccordionDetails>
          
         })} 
 </div>
    </Accordion>
  })}

    </Paper>
    
  );
}

export default SportsMenu;