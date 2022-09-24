import '../styles/_landingPage.scss';
import logo from '../assets/logo.svg';
import {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {actions as gameActions} from '../features/gameReducer'
import {actions as userActions} from '../features/userReducer'


function LandingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      async function handleLoggedIn() {
        const username = localStorage.getItem('user')
        const accountId = localStorage.getItem('accountKey')
        if(username && accountId) {
            await getGames()
            navigate(`/user/${username}`)
        }
      }

      handleLoggedIn()
  }, [])

    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleUsername: (e:any) => void = (e) => { 
      setLoginUsername(e.target.value)
    }
    
    const handlePassword: (e:any) => void = (e) => { 
      setLoginPassword(e.target.value)

      if(e.key == 'Enter') {
        login()
      }
    } 

    const handleSignUp: () => void = () => { 
        navigate('/signup');
    } 

    async function handleNoLogin() {
      setLoading(true)
      await getGames()
      dispatch(userActions.allUsers('all'))
      navigate('/leaderboard');
    }

    async function login() {
      setLoading(true)
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
          await getGames(); 
          navigate(`/user/${loginUsername}`);
        }
      }
    }

    async function getGames() {
      const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
      headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('games', JSON.stringify(data.matches));
        dispatch(gameActions.setAllGames(data.matches))
        setLoading(false)
      }
    }

    return (
      <div className="landingpage">
        {loading ? 
          <div className='loading'></div>
          : ''
        }
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
  
export default LandingPage;