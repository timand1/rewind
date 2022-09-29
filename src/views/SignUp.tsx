import '../styles/_signUp.scss';
import logo from '../assets/logo.svg';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    
    const [signUpUsername, setSignUpUsername] = useState<string>('');
    const [signUpPassword, setSignUpPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUsername: (e: ChangeEvent<HTMLInputElement>) => void = (e) => { 
      setSignUpUsername(e.target.value);
    };
    
    const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => { 
      setSignUpPassword(e.target.value);
    };

    async function signUp() {      
      if(signUpUsername.length > 2 && signUpPassword.length > 2) {
        setLoading(true);

        const account: object = {
          username: signUpUsername,
          password: signUpPassword
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
          navigate(`/user/${signUpUsername}`);
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
            <input onChange={(e) => {handleUsername(e)}} type="text" name="username" id="username" required />
        </div>
        <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => {handlePassword(e)}} type="password" name="password" id="password" required />
            {error ? <p className='error'>Account already exists</p> : ''}
        </div>
        <button onClick={signUp}>Create Account</button>
      </div>
    )
  }
  
export default SignUp;