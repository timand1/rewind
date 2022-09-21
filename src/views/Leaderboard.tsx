import '../styles/_leaderboard.scss';
import { useState } from 'react';
import { User } from '../models/data';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import DisplayUser from '../components/DisplayUser';

import { useDispatch } from 'react-redux';
import {actions as userActions} from '../features/userReducer'
import jsonData from '../data/data.json';

function Leaderboard() {
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState<string>('')
    const users:User[] = useSelector((state: RootState) => state.users);   
    let userElement = users.map((user) =>  <DisplayUser key={user.userId} user={user} />)

    const initialUserList : User[] = jsonData.users;
    const checkSearch = users < initialUserList ? true : false

    const handleInput: (e:any) => void = (e) => {  
      setSearchInput(e.target.value)
    } 

    const handleSearch: () => void = () => {         
      if(searchInput.length > 0) {
        searchInput.toLowerCase();
        setSearchInput('')
        dispatch(userActions.searchUser(searchInput))
      }
    } 
    
    const handleName: () => void = () => {       
      dispatch(userActions.sortByName())
    } 
    
    const handleWin: () => void = () => { 
      dispatch(userActions.sortByWin())
    } 
    
    const handleLoss: () => void = () => { 
      dispatch(userActions.sortByLoss())
    } 

    const resetSearch: () => void = () => { 
      dispatch(userActions.allUsers())
    } 
    

    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className='search-bar'>
            <input type="text" name="search" id="search" value={searchInput} placeholder='Search players...' onChange={(e) => { handleInput(e) }}/>
            {checkSearch ? <p className='clear-search' onClick={resetSearch}>X</p> : ''}
            <label htmlFor="search" onClick={handleSearch} >&#x1F50D;</label>
        </div>
        <select defaultValue={'all'} name="games" id="games">
            <option value="all">All games</option>
            <option value="dota">Dota 2</option>
            <option value="wow">World of Warcraft</option>
            <option value="td">Tower Defence</option>
        </select>
        <div className='headlines'>
          <h3 onClick={handleName}>Player</h3>
          <h3 onClick={handleWin}>Wins</h3>
          <h3 onClick={handleLoss}>Loss</h3>
          <h3>Win %</h3>
        </div>
        <div className='users'>
          {userElement}
        </div>
      </div>
    )
  }
  
export default Leaderboard;