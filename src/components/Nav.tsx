import '../styles/_nav.scss';
// import logo from '../assets/LOGO.png'
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

    const changeUrl: () => void = () => {
        showAll()
        setMenuOpen(false)
        const root:any = document.querySelector('#root');
        root.scrollIntoView({
            behavior: 'smooth'
          });
    };

    const handleHome: () => void = () => {
        showAll();
        navigate('/');
        setMenuOpen(false);
        const root:any = document.querySelector('#root');
        root.scrollIntoView({
            behavior: 'smooth'
          });
    };

   const scrollToAnimals: () => void = () => {
        showAll();
        setMenuOpen(false);
        setTimeout(() => {
            const divider:any = document.querySelector('#divider');
            divider.scrollIntoView({
                behavior: 'smooth'
                });
        }, 100);       
    };

    const showAll: () => void = () => {
        // dispatch(animalActions.allAnimals())
    };

    return (         
        <header>             
            {/* <img className='logo' onClick={(handleHome)} src={logo} alt="img" /> */}
            <h2>REWIND</h2>
            <div className="menu-btn" onClick={handleMenu}>
                <span className={menuOpen ? 'menu-btn--top' : ''}></span>
                <span className={menuOpen ? 'menu-btn--mid' : ''}></span>
                <span className={menuOpen ? 'menu-btn--bottom' : ''}></span>
            </div>
            <nav className={menuOpen ? 'nav open' : 'nav'}>
                <ul className="link-container">
                    <NavLink className="link" to="/" onClick={handleHome} >HEM</NavLink >
                    <NavLink className="link" to="/" onClick={scrollToAnimals} >DJUREN</NavLink>
                    <NavLink className="link" to="/about"  onClick={changeUrl} >OM OSS</NavLink>
                </ul>
            </nav>      
        </header>
    )
};
