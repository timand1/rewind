import '../styles/_leaderboard.scss';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { User } from '../models/data';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import DisplayUser from '../components/DisplayUser';

import { useDispatch } from 'react-redux';
import {actions as userActions} from '../features/userReducer'

function Leaderboard() {
    const dispatch = useDispatch();
  
    const [searchInput, setSearchInput] = useState<string>('')
    const [searched, setSearched] = useState<boolean>(false)

    const users:Array<any> = useSelector((state: RootState) => state.users);   
    
    let userElement = users.map((user, index) =>  <DisplayUser key={index} user={user} />)

    const handleInput: (e:any) => void = (e) => {  
      setSearchInput(e.target.value)
    } 

    const handleEnter: (e:any) => void = (e) => {
      if(e.key == 'Enter') {       
        handleSearch();
      }
    }

    const handleSearch: () => void = () => {         
      if(searchInput.length > 0) {
        dispatch(userActions.allUsers())
        searchInput.toLowerCase();
        setSearched(true)
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

    const handleWinRate: () => void = () => { 
      dispatch(userActions.sortByWinRate())
    } 

    const resetSearch: () => void = () => { 
      setSearched(false)
      dispatch(userActions.allUsers())
    } 
   
    // SORTERA EFTER SPEL

    return (
      <div className="leaderboard">
        <Nav />
        <h2>Leaderboard</h2>
        <div className='search-bar'>
            <input type="text" name="search" id="search" value={searchInput} placeholder='Search players...'  onKeyUp={(e) => {handleEnter(e)}} onChange={(e) => { handleInput(e) }}/>
            {searched ? <p className='clear-search' onClick={resetSearch}>X</p> : ''}
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
          <h3 onClick={handleWinRate}>Win %</h3>
        </div>
        <div className='users'>
          {userElement}
        </div>
      </div>
    )
  }
  
export default Leaderboard;