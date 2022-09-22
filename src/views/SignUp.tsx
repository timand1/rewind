import '../styles/_landingPage.scss';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    const handleUsername: (e:any) => void = (e) => { 
      setLoginUsername(e.target.value)
    }
    
    const handlePassword: (e:any) => void = (e) => { 
      setLoginPassword(e.target.value)
    } 

    async function signUp() {
      console.log(loginUsername);
      
      if(loginUsername.length > 2 && loginPassword.length > 2) {
        const account: object = {
          username: loginUsername,
          password: loginPassword
        };
        console.log(account)
        const response = await fetch('https://wool-fir-ping.glitch.me/api/signup', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          localStorage.setItem('accountKey', data.accountId);
          navigate(`/user/${loginUsername}`);
        }
      }
    }

    return (
      <div className="landingpage">
        <img src={logo} alt="rewind logo" />
        <h2>Your journey starts now</h2>
        <div className='input-container'>
            <label htmlFor="username">Username</label>
            <input onKeyUp={(e) => {handleUsername(e)}} type="text" name="username" id="username" required />
        </div>
        <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input onKeyUp={(e) => {handlePassword(e)}} type="password" name="password" id="password" required />
        </div>
        <button onClick={signUp}>Create Account</button>
      </div>
    )
  }
  
export default SignUp