import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/firebase';
import CreateIcon from '@mui/icons-material/Create';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorCodes, setErrorCode] = useState('');
    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate('/main')
            console.log(userCredential);
        })
        .catch((error) => {
            setErrorCode(error.code)
           
            console.log(error.code)
        })

    }
  return (
    <div sx={{
        width: 'auto',
        height: 'auto',
        color: 'palette.salat.main',
        }} 
        style={{ 
          backgroundColor: '#027b5b',
          opacity: '0.95',
          padding: 20,
          
          
        }} 
        fixed 
        disableGutters maxWidth={false}>
        <form onSubmit={signUp}>
            <h1>Sign up</h1>
            <TextField sx={{ 
          marginRight: 5,
          
          
        }} label="email" variant="filled" type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField label="password" variant="filled" type='password' placeholder='enter pass' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
            <p>{errorCodes}</p>
            <Button sx={{marginTop:'2rem', backgroundColor: '#004e32'}} variant="contained" size="small" type='submit'> <CreateIcon/> Create account</Button>
            <h2>Already have account?   <Link to="/login">sign in</Link></h2>
        </form>
    </div>
  )
}

export default SignUp