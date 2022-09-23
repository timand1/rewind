import '../styles/_userPage.scss';
import Nav from '../components/Nav';
import { Games, User } from '../models/data';
import DisplayGame from '../components/DisplayGame';
import infoIcon from '../assets/info.svg';
import infoActiveIcon from '../assets/infoActive.svg';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {actions as gameActions} from '../features/gameReducer'

type MyParams = {
  username: string;
};

function GamesList() {
    const { username } = useParams<keyof MyParams>() as MyParams;
    const dispatch = useDispatch()
    const [info, setInfo] = useState<boolean>(false)   

    const handleInfo: () => void = () => { 
      setInfo(!info)
    } 

    useEffect(() => {
      dispatch(gameActions.getAllGames())
    }, [])
    const activeInfo:any = info ? infoActiveIcon : infoIcon;

    const gamesList:Array<Games> = useSelector((state: RootState) => state.games)  

      //   ????????????????
    const newGamesArray:Array<Games> = [];


    const handleGame: (e:any) => void = (e) => { 
      if(e.target.value == 'all') {
        
      }
    //   ????????????????
      newGamesArray.filter(game => {
        game.game == e.target.value
      })
    } 
    // FIXA SORTERING DATUM OCH TID
    // FIXA FILTRERING AV TYP AV SPEL 
    const gameElement = gamesList.map((game, index) =>  <DisplayGame key={index} game={game} username={username} /> );

    return (
      <div className="userpage">
        <Nav />
        <h2>Games</h2>
        <div className='game-options'>
          <select defaultValue={'all'} name="game-type" id="game-type" onChange={(e) => handleGame(e)} >
            <option value="all">All games</option>
            <option value="Dota 2">Dota 2</option>
            <option value="World of Warcraft">World of Warcraft</option>
            <option value="Tower Defence">Tower Defence</option>
          </select>
        </div>
        <div className='headlines'>
          <h3>Game</h3>
          <h3>Time</h3>
          <h3>Date</h3>
          <h3>Winner</h3>
          <img src={activeInfo} className='info' onClick={handleInfo} alt="info" />
  
          {info ? <p className='info-box'>Click the cross to see players in a game</p> : ''}
        </div>
        <div>
          {gameElement}
        </div>
      </div>
    )
  }
  
export default GamesList;