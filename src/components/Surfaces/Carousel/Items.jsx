import React from 'react';
import { Paper, Button } from '@mui/material'

const Items = ({item}) => {
    return (
        <Paper sx={{backgroundColor:'blackSecondary.backgroundColor', color:'blackSecondary.color'}}>
            <img src={item.image} alt={item.title}  style={{
          height: '25vh',
          width: '100%',
          }} />
            <h2 style={{display: 'flex', justifyContent:'flex-end', marginTop: 2, marginRight: 10}}>{item.title}</h2>  
        </Paper>
    )
}

export default Items