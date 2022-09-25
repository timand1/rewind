import '../styles/_errorPage.scss';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

export default function ErrorPage() { 
    const navigate = useNavigate();

    const handleHome: () => void = () => {
        navigate('/')
    }
    return (         
        <section className='error-page'>
            <Nav />
            <h2>Seems like you took a wrong turn...</h2>
            <p>...or did you?</p>
            <button onClick={handleHome}>Go back</button>
        </section>
    )
};