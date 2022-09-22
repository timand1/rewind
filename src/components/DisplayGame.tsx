import '../styles/_displayGame.scss';
import cross from '../assets/cross.svg';
import { Games } from '../models/data'

interface GameProps {
    game: Games,
    username: string
}

export default function DisplayGame(props: GameProps) { 
    const { game, date, duration, win } = props.game;
    const slicedDate = date.slice(2)
    
    let gameResult = false;    
    
    props.game.team1.forEach(player => {
        if(Object.values(player).indexOf(props.username) > -1 && win == 'team1') {
            gameResult = true;
        } 
    })
    props.game.team2.forEach(player => {
        if(Object.values(player).indexOf(props.username) > -1 && win == 'team2') {
            gameResult = true;
        } 
    })

    return (         
        <section className='user-games'>             
            <p>{game}</p>
            <p>{duration}</p>
            <p>{slicedDate}</p>
            <p>{gameResult ? 'W' : 'L'}</p>
            <img src={cross} alt="" />
        </section>
    )
};