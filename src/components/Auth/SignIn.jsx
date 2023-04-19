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
    
    <div  style={{width: 'auto', height: 'auto', backgroundColor: '#027b5b', color: 'yellow.backgroundColor', opacity: '0.92',padding: '3em',}} 
    fixed disableGutters maxWidth={false}>
        <form onSubmit={signIn}>
 <Typography sx={{ fontSize: "2em", fontWeight: 'bold', marginBottom: '1em', color: 'yellow.backgroundColor'}}>Hey, Log In</Typography>
            <TextField style={{ marginRight: 20,}} label="email" variant="filled" type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField label="password" variant="filled" type='password' placeholder='enter pass' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
           <Typography sx={{color: 'orange', fontWeight: 'bold', }}>{errorCodes}</Typography>
            <Button   sx={{marginTop:'2rem', backgroundColor: '#004e32', height: '3rem', width: '10rem', fontSize: '.7em'}} variant="contained" size="small" type='submit'>
            <IconButton aria-label="fingerprint" color="salat">
              <Fingerprint />
            </IconButton>
              Push to login</Button>
            <Typography sx={{marginTop:'2rem',  fontSize: "1em", fontWeight: 'bold', color: 'yellow.backgroundColor'}}>or 
                <Link component='button' sx={{backgroundColor: 'salat', fontWeight: 'bold'}} underline="none" to="/register"> Register</Link>     
                </Typography> 
        </form>
    </div>
   
  )
}

export default SignIn