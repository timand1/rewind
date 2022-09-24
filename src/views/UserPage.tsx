import '../styles/_userPage.scss';
import infoIcon from '../assets/info.svg';
import infoActiveIcon from '../assets/infoActive.svg';
import Nav from '../components/Nav';
import DisplayGame from '../components/DisplayGame';
import { Games, User } from '../models/data';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {actions as gameActions} from '../features/gameReducer';

type MyParams = {
  username: string;
};

function UserPage() {
    const { username } = useParams<keyof MyParams>() as MyParams;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [chosenGame, setChosenGame] = useState<string>('all')
    const [filterSetting, setFilterSetting] = useState<string>('all')    

    useEffect(() => {
      async function loadUserGames() {        
        await getGames()
        
        const accountName = localStorage.getItem('user')
        const accountId = localStorage.getItem('accountKey')
        const userObj: object = {
          username: username,
          game: 'all'
        }
        if(accountName && accountId && accountName == username) {
          setLoggedIn(true)          
        }
        
        setChosenGame('all')
        setFilterSetting('all')
        dispatch(gameActions.getUserGames(userObj))
      }
      
      loadUserGames();
    }, [])

    async function getGames() {
      const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
      headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('games', JSON.stringify(data.matches));
        dispatch(gameActions.setAllGames(data.matches))                
      }
    }

    const [info, setInfo] = useState<boolean>(false)   

    const handleInfo: () => void = () => { 
      setInfo(!info)
    } 

    const activeInfo:any = info ? infoActiveIcon : infoIcon;
    
    let gamesList:Array<Games> = useSelector((state: RootState) => state.games)      

    const users:Array<User> = useSelector((state: RootState) => state.users)
    const chosenUser = users.filter(user => user.name == username)[0];
    
    let winPercentage : string = '';
    if(chosenUser) {

       winPercentage = ((chosenUser.win / (chosenUser.amountOfGames)) * 100).toFixed(1);    
    }

    const handleGame: (e:any) => void = (e) => { 
      const { value } = e.target;
      setChosenGame(value)
      
      const filterSearch: object = {
        filter : value,
        username : username,
        setting : filterSetting
      }
      dispatch(gameActions.filterUserGames(filterSearch))
    } 

    const handleGameSetting: (e:any) => void = (e) => {
      const { value } = e.target;

      setFilterSetting(value)

      const searchParams: object = {
        username : username,
        game : chosenGame
      }
      if(value == 'all') {        
        dispatch(gameActions.getUserGames(searchParams))
      } else if(value == 'last-ten') {
        dispatch(gameActions.lastTen(searchParams))
        gamesList = gamesList.slice(0, 1)
      } else if(value == 'no-win') {
        dispatch(gameActions.noWin(searchParams))
      }
    };

    const handleLogOut: (e:any) => void = (e) => {
      localStorage.removeItem('accountKey')
      localStorage.removeItem('user')
      navigate('/');
    };

    const sortDate: () => void = () => { 
      const searchObj: object = {
        username : username,
        game: chosenGame,
        setting : filterSetting
      }
      dispatch(gameActions.sortByDateUser(searchObj));
    };

    const sortDuration: () => void = () => { 
      const searchObj: object = {
        username : username,
        game: chosenGame,
        setting : filterSetting
      }
      dispatch(gameActions.sortByDurationUser(searchObj));
    };

    const gameElement = gamesList.map((game, index) =>  <DisplayGame key={index} game={game} username={username} /> );

    return (
      <div className="userpage">
        <Nav />
        
        <div className="header">
          <h2>{username}'s profile</h2>
          {loggedIn ? <p onClick={handleLogOut}>Log Out</p> : ''}
        </div>
        <div className='stats'>
          <p>Stats -</p>
          {chosenUser ? 
          <p>{chosenUser.amountOfGames} games - {chosenUser.win} wins - {winPercentage}% winrate</p>
          : ''}
        </div>
        <div className='game-options'>
          <select defaultValue={filterSetting} name="game-type" id="game-type" onChange={(e) => handleGame(e)} >
            <option value="all">All games</option>
            <option value="Dota 2">Dota 2</option>
            <option value="World of Warcraft">World of Warcraft</option>
            <option value="Tower Defence">Tower Defence</option>
          </select>
          <select defaultValue={filterSetting} name="games" id="games" onChange={(e) => handleGameSetting(e)}>
            <option value="all">All matches</option>
            <option value="last-ten">Last 10 games</option>
            <option value="no-win">Games without a winner</option>
          </select>
        </div>
        <div className='headlines'>
          <h3>Game</h3>
          <h3 onClick={sortDuration}>Time <span>&#x25BC;</span></h3>
          <h3 onClick={sortDate}>Date <span>&#x25BC;</span></h3>
          <h3>W/L</h3>
          <img src={activeInfo} className='info' onClick={handleInfo} alt="info" />
  
          {info ? <p className='info-box'>Click the cross to see players in a game</p> : ''}
        </div>
        {gamesList.length > 0 ? 
        <div className='games-list'>
          {gameElement}
        </div>
        : <p>No games yet!</p>
        }
        {gamesList.length == 0 ? <p>No games, start gaming!</p> : ''}
      </div>
    )
  }
  
export default UserPage;