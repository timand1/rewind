import '../styles/_leaderboard.scss';
import { User } from '../models/data';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DisplayUser from '../components/DisplayUser';

function Leaderboard() {
    const navigate = useNavigate();
    const users:User[] = useSelector((state: RootState) => state.users);
    const userElement = users.map((user) =>  <DisplayUser key={user.userId} user={user} />)

    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className='search-bar'>
            <input type="text" name="search" id="search" placeholder='Search players...'/>
            <label htmlFor="search">&#x1F50D;</label>
        </div>
        <select defaultValue={'all'} name="games" id="games">
            <option value="all">All games</option>
            <option value="dota">Dota 2</option>
            <option value="wow">World of Warcraft</option>
            <option value="td">Tower Defence</option>
        </select>
        <div className='headlines'>
          <h3>Player</h3>
          <h3>Wins</h3>
          <h3>Loss</h3>
          <h3>Win %</h3>
        </div>
        <div className='users'>
          {userElement}
        </div>
      </div>
    )
  }
  
export default Leaderboard;