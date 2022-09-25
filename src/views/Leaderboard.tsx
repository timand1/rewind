import '../styles/_leaderboard.scss';
import Nav from '../components/Nav';
import DisplayUser from '../components/DisplayUser';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {actions as userActions} from '../features/userReducer'


function Leaderboard() {
    const dispatch = useDispatch();
  
    const [searchInput, setSearchInput] = useState<string>('')
    const [searched, setSearched] = useState<boolean>(false)
    const [filterParams, setFilterParams] = useState<string>('all')

    useEffect(() => {
      dispatch(userActions.allUsers(filterParams))
    }, [])
    
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
      const searchLowerCase = searchInput.toLowerCase();      
      setSearched(true)
      setSearchInput('')
      dispatch(userActions.searchUser(searchLowerCase))
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
      setFilterParams('all')
      setSearched(false)
      dispatch(userActions.allUsers('all'))
    } 
   
    const handleGame: (e:any) => void = (e) => { 
      setFilterParams(e.target.value)
        dispatch(userActions.allUsers(e.target.value))
    };

    return (
      <div className="leaderboard">
        <Nav />
        <h2>Leaderboard</h2>
        <div className='search-bar'>
            <input type="text" name="search" id="search" value={searchInput} placeholder='Search players...'  onKeyUp={(e) => {handleEnter(e)}} onChange={(e) => { handleInput(e) }}/>
            {searched ? <p className='clear-search' onClick={resetSearch}>X</p> : ''}
            <label htmlFor="search" onClick={handleSearch} >&#x1F50D;</label>
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