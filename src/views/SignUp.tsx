import '../styles/_signUp.scss';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUsername: (e:any) => void = (e) => { 
      setLoginUsername(e.target.value);
    };
    
    const handlePassword: (e:any) => void = (e) => { 
      setLoginPassword(e.target.value);
    };

    async function signUp() {      
      if(loginUsername.length > 2 && loginPassword.length > 2) {
        setLoading(true);

        const account: object = {
          username: loginUsername,
          password: loginPassword
        };

        const response = await fetch('https://wool-fir-ping.glitch.me/api/signup', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('user', data.key.username);
          localStorage.setItem('accountKey', data.accountId);
          setLoading(false);
          navigate(`/user/${loginUsername}`);
        } else {
          setError(true)
        }
      };
    };

    return (
      <div className="signup">
        {loading ? 
          <div className='loading'></div>
          : ''
        }
        <img src={logo} alt="rewind logo" />
        <h2>Your journey starts now</h2>
        <div className='input-container'>
            <label htmlFor="username">Username</label>
            <input onKeyUp={(e) => {handleUsername(e)}} type="text" name="username" id="username" required />
        </div>
        <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input onKeyUp={(e) => {handlePassword(e)}} type="password" name="password" id="password" required />
            {error ? <p className='error'>Account already exists</p> : ''}
        </div>
        <button onClick={signUp}>Create Account</button>
      </div>
    )
  }
  
export default SignUp;