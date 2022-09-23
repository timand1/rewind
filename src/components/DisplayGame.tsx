import '../styles/_displayGame.scss';
import cross from '../assets/cross.svg';
import { useNavigate, useLocation } from 'react-router-dom'
import { Games } from '../models/data'
import { useState } from 'react';
import PlayersGame from './PlayersGame'

interface GameProps {
    game: Games,
    username: string
}

export default function DisplayGame(props: GameProps) { 
    const { game, date, duration, win } = props.game;

    const navigate = useNavigate();
    const location = useLocation();

    const slicedDate = date.slice(2);
    
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const activeInfoCss = showInfo ? 'active' : ''; 
    const handleInfo: () => void = () => {
        setShowInfo(!showInfo);
    }
    const playersArr:Array<string> = []
    props.game.team1.forEach(player => {
        playersArr.push(Object.values(player)[0])
    })
    props.game.team2.forEach(player => {
        playersArr.push(Object.values(player)[0])
    })
    
    const playersEl = playersArr.map((player, index) => <PlayersGame key={index} player={player} />);

    const handleGame: () => void = () => {
        navigate(`/game/${props.game.gameId}`)        
    }

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
    
    const showWinner = win ? win : 'No winner';
    const showWinLoss  = gameResult ? 'W' : 'L';

    return (         
        <section className='user-games'>             
            <div className='game-info'>
                <p onClick={handleGame}>{game}</p>
                <p>{duration}</p>
                <p>{slicedDate}</p>
                <p>{location.pathname == '/games' ? showWinner : showWinLoss}</p>
                <img src={cross} alt="" className={activeInfoCss} onClick={handleInfo}/>
            </div>
            {showInfo ?
                <div className="game-players">
                    <p>Players - </p>
                    <div>{playersEl}</div>
                </div>
                : ''
            }
        </section>
    )
};