import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/firebase';

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
    <div>
        <form onSubmit={signUp}>
            <h1>Sign up</h1>
            <input type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='enter pass' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <p>{errorCodes}</p>
            <button type='submit'>Create account</button>
            <p>already have account <Link to="/login">sign in</Link></p>
        </form>
    </div>
  )
}

export default SignUp