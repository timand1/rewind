import '../styles/_displayUser.scss';
import { User } from '../models/data'
import { useNavigate } from 'react-router-dom';

interface UserProps {
   user: User;
}

export default function DisplayUser(props: UserProps) { 
    const { name, win, lost } = props.user;

    const navigate = useNavigate();
    const winPercent = (win / (win + lost)) * 100;

    const handleuser: () => void = () => {
        navigate(`/user/${name.toLowerCase()}`);        
    };

    return (         
        <section className='leaderboard-user' onClick={handleuser}>             
            <p>{name}</p>
            <p>{win}</p>
            <p>{lost}</p>
            <p>{winPercent.toFixed(1)}</p>
        </section>
    )
};