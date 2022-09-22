import '../styles/_displayUser.scss';
import { User, Games } from '../models/data'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { actions as gameActions } from '../features/gameReducer';
import { actions as userActions } from '../features/userReducer';

interface UserProps {
   user: User;
}

export default function DisplayUser(props: UserProps) { 
    const { name, win, lost } = props.user
    const dispatch = useDispatch();
  
    

    const navigate = useNavigate();
    const winPercent = (win / (win + lost)) * 100;

    const handleuser: () => void = () => {

        navigate(`/user/${name.toLowerCase()}`)
        
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