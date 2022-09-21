import '../styles/_displayGame.scss';
import cross from '../assets/cross.svg';
import { Games } from '../models/data'

import { useNavigate } from 'react-router-dom';

interface GameProps {
    game: Games,
    user: string
}

export default function DisplayGame(props: GameProps) { 
    const { game, date, duration, win, lost, team1, team2 } = props.game;

    let gameResult;
    
     if(win == 'team1' && team1.includes(props.user)) {
        console.log('WINNNNS')
        gameResult = true;
    } else if(win == 'team2' && team2.includes(props.user)) {
        console.log('LOOOOOSSSSSSS')
        gameResult = false;
    }

    return (         
        <section className='user-games'>             
            <p>{game}</p>
            <p>{duration}</p>
            <p>{date}</p>
            <p>{gameResult ? 'W' : 'L'}</p>
            <img src={cross} alt="" />
        </section>
    )
};