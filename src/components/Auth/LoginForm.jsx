import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Main from '../Pages/Main';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginForm = (props) => {
  return (
    <div>
        <Routes>
        
      <Route exact path="/login" element={<SignIn/>}/>
      <Route exact path="/register" element={<SignUp/>}/>
      <Route  path="/" element={<SignIn/>}/>
      <Route  path="/main" element={<Main/>}/>
    </Routes>
      
    </div>
  );
}

export default LoginForm;