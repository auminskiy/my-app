import { Button, TextField, IconButton, Container, Typography } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/firebase';

const SignIn = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  //  const [errorText, setErrorText] = useState(false);
    const [errorCodes, setErrorCode] = useState('');

    const navigate = useNavigate();
   

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            navigate('/main/soccer')
        })
        .catch((error) => {
            setErrorCode(error.code)
            
            console.log(error.code)
           
           
        })

    }
  return (
    
    <Container 
    sx={{
      width: 'auto',
      height: 'auto',
      color: 'palette.salat.main',
      }} 
      style={{ 
        backgroundColor: '#027b5b',
        opacity: '0.9',
        padding: 20,
        
        
      }} 
      fixed 
      disableGutters maxWidth={false}>
    <div>
        <form 
       
        onSubmit={signIn}>
        
            <h1>Hey, Log In</h1>
            <TextField style={{ 
          marginRight: 20,
          
          
        }} label="email" variant="filled" type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField label="password" variant="filled" type='password' placeholder='enter pass' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
            
           <div>{errorCodes}</div>
          
            <Button   sx={{marginTop:'2rem', backgroundColor: '#004e32'}} variant="contained" size="small" type='submit'>
            <IconButton aria-label="fingerprint" color="salat">
              <Fingerprint />
            </IconButton>
              Push to login</Button>
              
            <h2 sx={{marginTop:'2rem'}}>or 
              
                <Link component='button' sx={{backgroundColor: 'salat', paddingLeft:20}} underline="none" to="/register"> Register</Link>
                     
                </h2>
            
            
        </form>
    </div>
    </Container>
  
  )
}

export default SignIn