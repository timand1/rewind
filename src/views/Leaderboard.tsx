import '../styles/_leaderboard.scss';
import searchIcon from '../assets/search-icon.svg';
import Nav from '../components/Nav';
import DisplayUser from '../components/DisplayUser';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {actions as userActions} from '../features/userReducer';
import {actions as gameActions} from '../features/gameReducer';


function Leaderboard() {
    const dispatch = useDispatch();
  
    const [searchInput, setSearchInput] = useState<string>('');
    const [searched, setSearched] = useState<boolean>(false);
    const [filterParams, setFilterParams] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(false);
    
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
          dispatch(userActions.allUsers(filterParams));
          setLoading(false);
        };
      };
    }, []);
    
    const users:Array<any> = useSelector((state: RootState) => state.users);   
    
    let userElement = users.map((user, index) =>  <DisplayUser key={index} user={user} />);

    const handleInput: (e:any) => void = (e) => {  
      setSearchInput(e.target.value);
    };

    const handleEnter: (e:any) => void = (e) => {
      if(e.key == 'Enter') {       
        handleSearch();
      };
    };

    const handleSearch: () => void = () => {         
      if(searchInput.length > 0) {
        const searchLowerCase = searchInput.toLowerCase();      
        setSearched(true);
        setSearchInput('');
        dispatch(userActions.searchUser(searchLowerCase));
      };
    };
    
    const handleName: () => void = () => {       
      dispatch(userActions.sortByName());
    };
    
    const handleWin: () => void = () => { 
      dispatch(userActions.sortByWin());
    };
    
    const handleLoss: () => void = () => { 
      dispatch(userActions.sortByLoss());
    };

    const handleWinRate: () => void = () => { 
      dispatch(userActions.sortByWinRate());
    };

    const resetSearch: () => void = () => { 
      setFilterParams('all');
      setSearched(false);
      dispatch(userActions.allUsers('all'));
    };
   
    const handleGame: (e:any) => void = (e) => { 
      setFilterParams(e.target.value);
        dispatch(userActions.allUsers(e.target.value));
    };

    return (
      <div className="leaderboard">
        <Nav />
        {loading ? 
          <div className='loading'></div>
          : ''
        }
        <h1>Leaderboard</h1>
        <div className='search-bar'>
            <input type="text" name="search" id="search" value={searchInput} placeholder='Search players...'  onKeyUp={(e) => {handleEnter(e)}} onChange={(e) => { handleInput(e) }}/>
            {searched ? <p className='clear-search' onClick={resetSearch}>X</p> : ''}
            <img className='search-icon' src={searchIcon} alt="search icon" />
        </div>
        <select value={filterParams} name="games" id="games" onChange={(e) => {handleGame(e)}} >
        <option value="all">All games</option> 
            <option value="Dota 2">Dota 2</option>
            <option value="World of Warcraft">World of Warcraft</option>
            <option value="Tower Defence">Tower Defence</option>
        </select>
        <div className='headlines'>
          <h3 className='sort' onClick={handleName}>Player <span>&#x25BC;</span></h3>
          <h3 className='sort' onClick={handleWin}>Wins <span>&#x25BC;</span></h3>
          <h3 className='sort' onClick={handleLoss}>Loss <span>&#x25BC;</span></h3>
          <h3 className='sort' onClick={handleWinRate}>Win % <span>&#x25BC;</span></h3>
        </div>
        <div className='users'>
          {userElement}
          {users.length > 0 ? '' : <p>Sorry, no user matched your search</p> }
        </div>
      </div>
    )
  }
  
export default Leaderboard;