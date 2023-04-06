import { Button, TextField, Typography } from '@mui/material';
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
            navigate('/main/soccer')
            console.log(userCredential);
        })
        .catch((error) => {
            setErrorCode(error.code)
           
            console.log(error.code)
        })

    }
  return (
    <div 
        style={{width: 'auto', height: 'auto', backgroundColor: '#027b5b', color: 'yellow.backgroundColor', opacity: '0.92',padding: '3em',}} 
      fixed disableGutters maxWidth={false}>
        <form onSubmit={signUp}>
            <Typography sx={{ fontSize: "2em", fontWeight: 'bold', marginBottom: '1em', color: 'yellow.backgroundColor',}}>Sign up</Typography>
            <TextField sx={{ marginRight: 5, }} label="email" variant="filled" type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField label="password" variant="filled" type='password' placeholder='enter pass' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
            <Typography sx={{color:'orange', fontWeight: 'bold'}}>{errorCodes}</Typography>
            <Button sx={{marginTop:'2rem', backgroundColor: '#004e32'}} variant="contained" size="small" type='submit'> <CreateIcon/> Create account</Button>
            <Typography sx={{marginTop:'2rem',  fontSize: "1em", fontWeight: 'bold', color: 'yellow.backgroundColor',}}>Already have account?   <Link to="/login">sign in</Link></Typography>
        </form>
    </div>
  )
}

export default SignUp