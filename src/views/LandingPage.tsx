import '../styles/_landingPage.scss';
import logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    // useEffect(() => {
    //   let accountKey:string = JSON.parse(localStorage.getItem('accountKey') || '');
    //   if(accountKey) {
    //     navigate(`/user/${accountKey}`)
    //   }
    // })

    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    const handleUsername: (e:any) => void = (e) => { 
      setLoginUsername(e.target.value)
    }
    
    const handlePassword: (e:any) => void = (e) => { 
      setLoginPassword(e.target.value)
    } 

    const handleSignUp: () => void = () => { 
        navigate('/signup');
    } 

    const handleNoLogin: () => void = () => { 
        navigate('/leaderboard');
    } 

    async function login() {
      if(loginUsername.length > 2 && loginPassword.length > 2) {
        const account: object = {
          username: loginUsername,
          password: loginPassword
        };
        const response = await fetch('https://wool-fir-ping.glitch.me/api/login', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('user', data.key.username);
          localStorage.setItem('accountKey', data.key.accountId);
          navigate(`/user/${data.key.accountId}`);
        }
      }
    }

    return (
      <div className="landingpage">
        <img src={logo} alt="rewind logo" />
        <h2>Login</h2>
        <div className='input-container'>
            <label htmlFor="username">Username</label>
            <input onKeyUp={(e) => {handleUsername(e)}} type="text" name="username" id="username" required />
        </div>
        <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input onKeyUp={(e) => {handlePassword(e)}} type="password" name="password" id="password" required />
        </div>
        <p className='sign-up'>No account? <span onClick={handleSignUp}>Sign Up</span></p>
        <button onClick={login}>Login</button>
        <p>Or</p>
        <h3 onClick={handleNoLogin}>Continue without logging in &#10230;</h3>
      </div>
    )
  }
  
export default LandingPage