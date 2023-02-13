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
            navigate('/main/upcoming')
        })
        .catch((error) => {
            setErrorCode(error.code)
            
            console.log(error.code)
           
           
        })

    }
  return (
    <div>
        <form onSubmit={signIn}>
        
            <h1>Hey, Log In</h1>
            <input type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='enter pass' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            
           <div>{errorCodes}</div>
            
            <button type='submit'>Push to login</button>
            <p>or <Link to="/register">register</Link></p>
        </form>
    </div>
  )
}

export default SignIn