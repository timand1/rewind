import '../styles/_gameList.scss';
import Nav from '../components/Nav';
import { Games } from '../models/data';
import DisplayGame from '../components/DisplayGame';
import infoIcon from '../assets/info.svg';
import infoActiveIcon from '../assets/infoActive.svg';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {actions as gameActions} from '../features/gameReducer';

interface SortOptionsProps {
  game: string;
  sortBy: boolean;
}

function GamesList() {
    const dispatch = useDispatch();

    const [gameFilter, setGameFilter] = useState<string>('all');
    const [info, setInfo] = useState<boolean>(false);   
    const [loading, setLoading] = useState<boolean>(false);
    const [sortByDate, setSortByDate] = useState<boolean>(false);
    const [sortByDuration, setSortByDuration] = useState<boolean>(false);

    const handleInfo: () => void = () => { 
      setInfo(!info);
    } ;

    useEffect(() => {
      getGames();

      async function getGames() {
        setLoading(true);
        const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
        headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        
        if (data.success) {
          localStorage.setItem('games', JSON.stringify(data.matches));
          dispatch(gameActions.setAllGames(data.matches));
          setLoading(false);
        };
      };
    }, []);

    const activeInfo:any = info ? infoActiveIcon : infoIcon;

    const gamesList:Array<Games> = useSelector((state: RootState) => state.games)  

    const handleGame: (e:any) => void = (e) => { 
      setGameFilter(e.target.value);
      if(e.target.value == 'all') {
        dispatch(gameActions.getAllGames());
      } else {
        dispatch(gameActions.filteredGames(e.target.value));
      };
    };

    const sortDate: () => void = () => { 
      setSortByDate(!sortByDate);
      const sortOptions: SortOptionsProps = {
        game : gameFilter,
        sortBy : sortByDate
      };

      dispatch(gameActions.sortByDate(sortOptions));
    };

    const sortDuration: () => void = () => { 
      setSortByDuration(!sortByDuration);
      const sortOptions: SortOptionsProps = {
        game : gameFilter,
        sortBy : sortByDuration
      };

      dispatch(gameActions.sortByDuration(sortOptions));
    };
    
    const gameElement = gamesList.map((game, index) =>  <DisplayGame key={index} game={game} /> );

    return (
      <div className="gamelist">
        <Nav />
        {loading ? 
          <div className='loading'></div>
          : ''
        }
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
          <h3 className='sort' onClick={sortDuration}>Time <span>&#x25BC;</span></h3>
          <h3 className='sort' onClick={sortDate}>Date <span>&#x25BC;</span></h3>
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