import '../styles/_userPage.scss';
import { Games } from '../models/data';
import DisplayGame from '../components/DisplayGame';
import infoIcon from '../assets/info.svg';
import infoActiveIcon from '../assets/infoActive.svg';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';




function UserPage() {
    const navigate = useNavigate();
    const {userId} = useParams();

    const [info, setInfo] = useState<boolean>(false)

    const singleUser = useSelector((state: RootState) => state.users).filter(user => user.userId == userId)[0]
    
    const winPercentage = ((singleUser.win / (singleUser.win + singleUser.lost)) * 100).toFixed(1);
    const amountOfGames = singleUser.win + singleUser.lost;

    const handleInfo: () => void = () => { 
      setInfo(!info)
    } 
    const activeInfo:any = info ? infoActiveIcon : infoIcon;

    const gamesList:Array<Games> = useSelector((state: RootState) => state.games)    
    const gameElement = gamesList.map((game, index) =>  <DisplayGame key={index} game={game} user={singleUser.name} /> )

    return (
      <div className="userpage">
          <h2>{singleUser.name}'s profile</h2>
          <div className='stats'>
            <p>Stats -</p>
            <p>{amountOfGames} games - {singleUser.win} wins - {winPercentage}% winrate</p>
          </div>
          <select defaultValue={'all'} name="games" id="games">
            <option value="all">All games</option>
            <option value="dota">Dota 2</option>
            <option value="wow">World of Warcraft</option>
            <option value="td">Tower Defence</option>
        </select>
        <div className='headlines'>
          <h3>Game</h3>
          <h3>Time</h3>
          <h3>Date</h3>
          <h3>W/L</h3>
          <img src={activeInfo} className='info' onClick={handleInfo} alt="info" />
  
          {info ? <p className='info-box'>Click the cross to see players in a game</p> : ''}
        </div>
        <div>
          {gameElement}
        </div>
      </div>
    )
  }
  
export default UserPage;