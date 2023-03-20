import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Divider, Typography } from '@mui/material';
import auth from '../../Firebase/firebase';


const ProfileInfo = () => {

   
 console.log(auth.currentUser.email)
 
 

  return (
   
    <Box color='secondary' sx={{ width: '100%',  }}>
          <Typography sx={{marginBottom: 3, marginLeft: 3, marginTop: 3, }}>Profile information</Typography>
        <Divider sx={{marginBottom: 3, width:'100%'}}/>
      <Stack sx={{margin: 3, }} spacing={2}>
      
      <Typography>ID: {auth.currentUser.uid} </Typography>
        <Typography>Nickname: {auth.currentUser.email.split('@')[0]} </Typography>
        <Typography>E-mail: {auth.currentUser.email} </Typography>
        <Typography sx={{display: 'flex',
    flexWrap: 'wrap',
    }}> Verification:
        {auth.currentUser.email.emailVerified === true 
        
        ? < Typography sx={{color: 'green'}}>&nbsp;passed</Typography>
        : <Typography sx={{color: 'red'}}>&nbsp;failed</Typography> }
        </Typography>
     
      </Stack>
    </Box>
   
  )
}

export default ProfileInfo