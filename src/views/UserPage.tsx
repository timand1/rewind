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
import {actions as userActions} from '../features/userReducer';

type MyParams = {
  username: string;
};

interface FilterProps {
  username: string;
  game: string;
  setting: string;
  sortBy?: string;
}

function UserPage() {
    const { username } = useParams<keyof MyParams>() as MyParams;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [chosenGame, setChosenGame] = useState<string>('all');
    const [filterSetting, setFilterSetting] = useState<string>('all'); 
    const [userTen, setUserTen] = useState<User>({
      name: username,
      win: 0,
      lost: 0,
      amountOfGames: 0,
      winRate : 0
    }); 


    useEffect(() => {
      async function loadUserGames() {        
        await getGames();
        
        const accountName = localStorage.getItem('user')
        const accountId = localStorage.getItem('accountKey')
        const userObj: object = {
          username: username,
          game: 'all'
        };
        if(accountName && accountId && accountName == username) {
          setLoggedIn(true);
        };
        
        setChosenGame('all');
        setFilterSetting('all');
        dispatch(gameActions.getUserGames(userObj));
        setLoading(false);
      };
      
      loadUserGames();
    }, [username]);

    async function getGames() {
      const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
      headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('games', JSON.stringify(data.matches));
        dispatch(gameActions.setAllGames(data.matches));
        dispatch(userActions.allUsers('all'));
      };
    };

    const [info, setInfo] = useState<boolean>(false);

    const handleInfo: () => void = () => { 
      setInfo(!info);
    };

    const activeInfo:any = info ? infoActiveIcon : infoIcon;
    
    let gamesList:Array<Games> = useSelector((state: RootState) => state.games);
    
    useEffect(() => {
      if(filterSetting == 'last-ten') {
        let arrCopy:Array<Games> = [...gamesList];

        let win: number = 0;
        // Incase a player does not have 10 games with a certain game.
        const amountOfGames: number = arrCopy.length;
        
        for (const game of arrCopy) {
          game.team1.forEach(player => {
            if(Object.values(player).indexOf(username) > -1 && game.win == 'team1') {
              win = win + 1;
            };
          });
          game.team2.forEach(player => {
              if(Object.values(player).indexOf(username) > -1 && game.win == 'team2') {
                  win = win + 1;
              };
            });
        };
        const winRate: number = (win / amountOfGames ) * 100;

        const userObj: User = {
            name: username,
            win: win,
            lost: amountOfGames - win,
            amountOfGames: amountOfGames,
            winRate : parseInt(winRate.toFixed(1))
        };
        setUserTen(userObj);
      }
    }, [chosenGame, filterSetting]);

    const users:Array<User> = useSelector((state: RootState) => state.users);
    const chosenUser = users.filter(user => user.name == username)[0];
    
    const handleGame: (e:any) => void = (e) => { 
      const { value } = e.target;
      setChosenGame(value);
      
      const filterSearch: FilterProps = {
        game : value,
        username : username,
        setting : filterSetting
      };
      dispatch(gameActions.filterUserGames(filterSearch));
    } 

    const handleGameSetting: (e:any) => void = (e) => {
      const { value } = e.target;

      setFilterSetting(value);

      const searchParams: FilterProps = {
        username : username,
        game : chosenGame,
        setting : value
      };
      if(value == 'all') {        
        dispatch(gameActions.getUserGames(searchParams));
      } else {
        dispatch(gameActions.filterGames(searchParams));
      };
    };

    const handleLogOut: () => void = () => {
      localStorage.removeItem('accountKey');
      localStorage.removeItem('user');
      navigate('/');
    };

    const sortDate: () => void = () => { 
      const searchObj: FilterProps = {
        username : username,
        game: chosenGame,
        setting : filterSetting,
        sortBy: 'date'
      }
      dispatch(gameActions.sortByTimeUser(searchObj));
    };

    const sortDuration: () => void = () => { 
      const searchObj: FilterProps = {
        username : username,
        game: chosenGame,
        setting : filterSetting,
        sortBy: 'duration'
      };
      dispatch(gameActions.sortByTimeUser(searchObj));
    };

    const gameElement = gamesList.map((game, index) =>  <DisplayGame key={index} game={game} username={username} /> );

    return (
      <div className="userpage">
        <Nav />
        {loading ? 
          <div className='loading'></div>
          : ''
        }
        <div className="header">
          <h2>{username}'s profile</h2>
          {loggedIn ? <p onClick={handleLogOut}>Log Out</p> : ''}
        </div>
        <div className='stats'>
          <p>Stats -</p>
          {chosenUser ? 
          <p>{chosenUser.amountOfGames} games - {chosenUser.win} wins - {chosenUser.winRate}% winrate</p>
          : ''}
          {userTen.amountOfGames > 0 && filterSetting == 'last-ten' ? 
              <p>Last {userTen?.amountOfGames} : {userTen?.win} wins - {userTen?.lost} lost - {userTen?.winRate}% winrate</p>
              : '' 
            } 

        </div>
        <div className='game-options'>
          <select value={chosenGame} name="game-type" id="game-type" onChange={(e) => handleGame(e)} >
            <option value="all">All games</option>
            <option value="Dota 2">Dota 2</option>
            <option value="World of Warcraft">World of Warcraft</option>
            <option value="Tower Defence">Tower Defence</option>
          </select>
          <select value={filterSetting} name="games" id="games" onChange={(e) => handleGameSetting(e)}>
            <option value="all">All matches</option>
            <option value="last-ten">Last 10 games</option>
            <option value="no-win">Games without a winner</option>
          </select>
        </div>
        <div className='headlines'>
          <h3>Game</h3>
          <h3 className='sort' onClick={sortDuration}>Time <span>&#x25BC;</span></h3>
          <h3 className='sort' onClick={sortDate}>Date <span>&#x25BC;</span></h3>
          <h3>W/L</h3>
          <img src={activeInfo} className='info' onClick={handleInfo} alt="info" />
  
          {info ? <p className='info-box'>Click the cross to see players in a game</p> : ''}
        </div>
        {gamesList.length > 0 ? 
        <div className='games-list'>
          {gameElement}
        </div>
        : <p>No games</p>
        }
      </div>
    )
  }
  
export default UserPage;