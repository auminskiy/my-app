import { Box } from '@mui/material';
import * as React from 'react';
import ListMenu from './ListMenu';
import ProfileRoutes from './ProfileVisual';

const Profile = () => {
  return (<Box sx={{ display: 'flex', backgroundColor:'blackSL.backgroundColor',
  color:'yellow.backgroundColor', minHeight: '100vh', marginTop: {xs: 7, md: 8}}}>
    <ListMenu/>
    <ProfileRoutes />
    </Box>
  )
}

export default Profile;