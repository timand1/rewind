import '../styles/_nav.scss';
import logo from '../assets/logo.svg'
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Nav() { 
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const username = localStorage.getItem('user')
        const accountId = localStorage.getItem('accountKey')
        if(username && accountId) {
            setLoggedIn(true)
        }
    }, [])

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleMenu: () => void = () => {
        setMenuOpen(!menuOpen);       
    };

    const handleHome: () => void = () => {
        navigate('/');
        setMenuOpen(false);
        const root:any = document.querySelector('#root');
        root.scrollIntoView({
            behavior: 'smooth'
          });
    };

    const handleAccount: () => void = () => {
        const username = localStorage.getItem('user')
        navigate(`/user/${username}`)      
    };

    return (         
        <header>             
            <img className='logo' onClick={(handleHome)} src={logo} alt="img" />
            <h2 className='nav-headline'>REWIND</h2>
            <div className="menu-btn" onClick={handleMenu}>
                <span className={menuOpen ? 'menu-btn--top' : ''}></span>
                <span className={menuOpen ? 'menu-btn--mid' : ''}></span>
                <span className={menuOpen ? 'menu-btn--bottom' : ''}></span>
            </div>
            <nav className={menuOpen ? 'nav open' : 'nav'}>
                <ul className="link-container">
                    <NavLink className="link" to="/leaderboard" >LEADERBOARD</NavLink >
                    <NavLink className="link" to="/addgame" >ADD GAME</NavLink>
                    <NavLink className="link" to="/games" >MATCHES</NavLink>
                    {loggedIn ? 
                        <p className="link" onClick={handleAccount}> ACCOUNT</p>                
                        : ''
                    }
                </ul>
            </nav>      
        </header>
    )
};
