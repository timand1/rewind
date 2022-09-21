import '../styles/_landingPage.scss';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    // LOGIN

    const handleSignUp: () => void = () => { 
        navigate('/signup');
    } 

    const handleNoLogin: () => void = () => { 
        navigate('/leaderboard');
    } 

    return (
      <div className="landingpage">
        <img src={logo} alt="rewind logo" />
        <h2>Login</h2>
        <div className='input-container'>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" required />
        </div>
        <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
        </div>
        <p className='sign-up'>No account? <span onClick={handleSignUp}>Sign Up</span></p>
        <button>Login</button>
        <p>Or</p>
        <h3 onClick={handleNoLogin}>Continue without logging in &#10230;</h3>
      </div>
    )
  }
  
export default LandingPage