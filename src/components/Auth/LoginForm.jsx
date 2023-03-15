import { Container, Paper } from '@mui/material';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Main from '../Pages/Main';
import Profile from '../Profile/Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginForm = (props) => {
  return (
    <div >
       <Container  style={{ 
        backgroundImage: `url("https://phonoteka.org/uploads/posts/2022-01/1642704781_17-phonoteka-org-p-stadion-fon-17.jpg")`,
       
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          flexDirection: "row-reverse",
          width: "100%",
          height: "100vh",
         
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 10%"
        
      }} 
     
      disableGutters maxWidth={false} >
        <Routes>
        
      <Route exact path="/login" element={<SignIn/>}/>
      <Route exact path="/register" element={<SignUp/>}/>
      <Route  path="/" element={<SignIn/>}/>
      <Route  path="/main/*" element={<Main/>}/>
      
    </Routes>
    
    </Container>
    </div>
  );
}

export default LoginForm;