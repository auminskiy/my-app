import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Divider, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import InfoIcon from '@mui/icons-material/Info';
 
const ProfileInfo = () => {

   
 
  const auth = getAuth();
  const user = auth.currentUser;
 
   
  console.log(user)
 
 
 

  return (
   
    <Box color='secondary' sx={{ width: '100%', backgroundColor:'blackSL.color',
    color:'blackSL.backgroundColor', borderRadius: 0, }}>
          <Typography sx={{display: 'flex',
    flexWrap: 'wrap', marginBottom: 3, marginLeft: 3, marginTop: 3, }}><InfoIcon/>&nbsp;Profile information</Typography>
        <Divider sx={{marginBottom: 3, width:'100%'}}/>
      <Stack marginLeft={3} spacing={2}>
     
      <Typography sx={{display: 'flex',
    flexWrap: 'wrap', 
    }}><PermIdentityIcon/>&nbsp;
         ID: {auth.currentUser.uid} </Typography>
        <Typography sx={{display: 'flex',
    flexWrap: 'wrap',
    }}><BadgeIcon/>&nbsp;
           Nickname: {auth.currentUser.email.split('@')[0]} </Typography>
        <Typography sx={{display: 'flex',
    flexWrap: 'wrap',
    }}><EmailIcon/>&nbsp;
           E-mail: {auth.currentUser.email} </Typography>
        <Typography sx={{display: 'flex',
    flexWrap: 'wrap',
    }}> <VerifiedUserIcon/>
     &nbsp;Verification:
        {auth.currentUser.email.emailVerified === true 
        
        ? < Typography sx={{color: 'green'}}>&nbsp;passed</Typography>
        : <Typography sx={{color: 'red'}}>&nbsp;failed</Typography> }
        </Typography>
     
      </Stack>
    </Box>
   
  )
}

export default ProfileInfo