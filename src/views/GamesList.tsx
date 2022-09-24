import '../styles/_userPage.scss';
import Nav from '../components/Nav';
import { Games, User } from '../models/data';
import DisplayGame from '../components/DisplayGame';
import infoIcon from '../assets/info.svg';
import infoActiveIcon from '../assets/infoActive.svg';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {actions as gameActions} from '../features/gameReducer'

type MyParams = {
  username: string;
};

function GamesList() {
    const { username } = useParams<keyof MyParams>() as MyParams;
    const dispatch = useDispatch()

    const [gameFilter, setGameFilter] = useState<string>('all')
    const [info, setInfo] = useState<boolean>(false);   

    const handleInfo: () => void = () => { 
      setInfo(!info)
    } 

    useEffect(() => {
      dispatch(gameActions.getAllGames())
    }, [])
    const activeInfo:any = info ? infoActiveIcon : infoIcon;

    const gamesList:Array<Games> = useSelector((state: RootState) => state.games)  

    const handleGame: (e:any) => void = (e) => { 
      setGameFilter(e.target.value)
      if(e.target.value == 'all') {
        dispatch(gameActions.getAllGames());
      } else {
        dispatch(gameActions.filteredGames(e.target.value));
      }
    };

    const sortDate: () => void = () => { 
      dispatch(gameActions.sortByDate(gameFilter));
    };

    const sortDuration: () => void = () => { 
      dispatch(gameActions.sortByDuration(gameFilter));
    };
    
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
          <h3 onClick={sortDuration}>Time &#x25BC;</h3>
          <h3 onClick={sortDate}>Date &#x25BC;</h3>
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