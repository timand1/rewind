import '../styles/_nav.scss';
import logo from '../assets/logo.svg'
import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { actions as animalActions } from '../features/animalReducer';

export default function Nav() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    return (         
        <header>             
            <img className='logo' onClick={(handleHome)} src={logo} alt="img" />
            <h2>REWIND</h2>
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
                </ul>
            </nav>      
        </header>
    )
};
