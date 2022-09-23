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

function UserPage() {
    const { username } = useParams<keyof MyParams>() as MyParams;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const accountName = localStorage.getItem('user')
        const accountId = localStorage.getItem('accountKey')
        if(accountName && accountId && accountName == username) {
            setLoggedIn(true)
        }
    }, [])

    const [info, setInfo] = useState<boolean>(false)   

    const handleInfo: () => void = () => { 
      setInfo(!info)
    } 

    const activeInfo:any = info ? infoActiveIcon : infoIcon;

    let gamesList:Array<Games> = useSelector((state: RootState) => state.games)  

    const users:Array<User> = useSelector((state: RootState) => state.users)
    const chosenUser = users.filter(user => user.name == username)[0];
    
    useEffect(() => {
      dispatch(gameActions.getUserGames(username))
    }, [])

    let winPercentage : string = '';
    if(chosenUser) {

       winPercentage = ((chosenUser.win / (chosenUser.amountOfGames)) * 100).toFixed(1);    
    }

    const handleGame: (e:any) => void = (e) => { 
      const { value } = e.target;

      if(value == 'all') {
        dispatch(gameActions.getUserGames(username))
      } else {
        const filterSearch: object = {
          filter : value,
          username : username
        }
        dispatch(gameActions.filterGames(filterSearch))
        
      } 
    } 

    const handleGameSetting: (e:any) => void = (e) => {
      const { value } = e.target;
      if(value == 'all') {        
        dispatch(gameActions.getUserGames(username))
      } else if(value == 'last-ten') {
        dispatch(gameActions.lastTen(username))
        gamesList = gamesList.slice(0, 1)
      } else if(value == 'no-win') {
        dispatch(gameActions.noWin(username))
      }
    };

    const handleLogOut: (e:any) => void = (e) => {
      localStorage.removeItem('accountKey')
      localStorage.removeItem('user')
      navigate('/');
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
          <select defaultValue={'all'} name="game-type" id="game-type" onChange={(e) => handleGame(e)} >
            <option value="all">All games</option>
            <option value="Dota 2">Dota 2</option>
            <option value="World of Warcraft">World of Warcraft</option>
            <option value="Tower Defence">Tower Defence</option>
          </select>
          <select defaultValue={'all'} name="games" id="games" onChange={(e) => handleGameSetting(e)}>
            <option value="all">All matches</option>
            <option value="last-ten">Last 10 games</option>
            <option value="no-win">Games without a winner</option>
          </select>
        </div>
        <div className='headlines'>
          <h3>Game</h3>
          <h3>Time</h3>
          <h3>Date</h3>
          <h3>W/L</h3>
          <img src={activeInfo} className='info' onClick={handleInfo} alt="info" />
  
          {info ? <p className='info-box'>Click the cross to see players in a game</p> : ''}
        </div>
        {chosenUser ? 
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