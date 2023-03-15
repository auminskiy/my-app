import { Box } from '@mui/material';
import * as React from 'react';
import ListMenu from './ListMenu';
import ProfileRoutes from './ProfileVisual';

const Profile = () => {
  return (<Box sx={{ display: 'flex' }}>
    <ListMenu/>
    <ProfileRoutes />
    </Box>
  )
}

export default Profile;