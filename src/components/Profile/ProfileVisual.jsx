import React from 'react'
import { Route} from 'react-router-dom';
import { Routes } from 'react-router';
import Bets from './Bets';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';

const ProfileRoutes = () => {
  return (

<Routes>

<Route  path="profile" element={<ProfileInfo/>}/>
 <Route  path="bets" element={<Bets/>}/>
        
        </Routes>
   
       
  )
}

export default ProfileRoutes