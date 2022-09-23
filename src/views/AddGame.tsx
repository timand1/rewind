import '../styles/_addGame.scss';
import Nav from '../components/Nav';
import PlayerInput from '../components/PlayerInput';
import { useState } from 'react';
import { Games } from '../models/data'

function AddGame() {
    const [showTeamTwo, setShowTeamTwo] = useState<boolean>(false)

    const [teamOne, setTeamOne] = useState<Array<object>>([]);
    const [teamTwo, setTeamTwo] = useState<Array<object>>([]);
    const [game, setGame] = useState<string>('');
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [addedGame, setAddedGame] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit: (e:any) => void = (e) => {
        e.preventDefault();
        setShowTeamTwo(false);
        setAddedGame(true);
        
        const newGame: object = {
            game: game,
            team1: teamOne,
            team2: teamTwo,
            win: winner,
            lost: loser,
            date: date,
            duration: duration,
            gameId: (Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)).toString()
        }

        addGame(newGame)
    }

    async function addGame(newGame : object) {
        setLoading(true)
        const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
        method: 'POST',
        body: JSON.stringify(newGame),
        headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.success) {
            setLoading(false)
            setAddedGame(true)
        }
    }
    
    const handleGame: (e:any) => void = (e) => {
        setGame(e.target.value);
    }

    const handleTeamOne: (player:object, index: number) => void = (player, index) => {      
        const teamOneCopy = [...teamOne];
        teamOneCopy[index] = player

        setTeamOne(teamOneCopy)
    }

    const handleTeamTwo: (player:object, index: number) => void = (player, index) => {    
        const teamTwoCopy = [...teamTwo];
        teamTwoCopy[index] = player

        setTeamTwo(teamTwoCopy)
    }

    const handleResult: (e:any) => void = (e) => {
        if(e.target.value === 'win') {
            setWinner(e.target.name)
        } else {
            setLoser(e.target.name)
        }
    }

    const handleDate: (e:any) => void = (e) => {
        setDate(e.target.value);
    }

    const handleDuration: (e:any) => void = (e) => {
        setDuration(e.target.value);
    }

    const handleShowTeams: (e:any) => void = (e) => {
        setShowTeamTwo(!showTeamTwo)
    }

    const handleAdded: (e:any) => void = (e) => {
        setAddedGame(false)
        setShowTeamTwo(false)
    }

    return (
      <div className="add-game">
        <Nav />
        {addedGame ? 
            <div className="added-container">
                <h3 className='added-confirm'>Game added successfully</h3>
                <button onClick={handleAdded}>Got it</button>
            </div>
            : ''
        }
        {loading ? 
            <div className='loading'></div>
            : ''
        }
        <form onSubmit={handleSubmit}>
        <div className='form-container'>
        <label htmlFor="game">Game</label>
            <select onChange={(e) => {handleGame(e)}} name="game" id="game" defaultValue='DEFAULT'>
                <option value="DEFAULT">-- Choose a game --</option>
                <option value="Dota 2">Dota 2</option>
                <option value="Dota 2">World of Warcraft</option>
                <option value="Dota 2">Tower Defence</option>
            </select>
        </div>
        <div className='form-container'>
            <label htmlFor="player">Date</label>
            <input type="date" name="date" id="date" onChange={(e) => {handleDate(e)}} required/>
        </div>
        <div className='form-container'>
            <label htmlFor="player">Duration (hh/mm)</label>
            <input type="time" name="duration" id="duration" onChange={(e) => {handleDuration(e)}} required/>
        </div>
        <div className='divider'></div>
        <div className="teams">
            <div className='team-container'>
                <div className='form-container'>
                <h2>Team 1</h2>
                    <select onChange={(e) => {handleResult(e)}} name="team1" id="result" defaultValue='DEFAULT'>
                        <option value="DEFAULT">-- Result --</option>
                        <option value="win">Winner</option>
                        <option value="loss">Loser</option>
                    </select>
                </div>
                <PlayerInput handleTeam={handleTeamOne} required={true} playerNum={'1'} />
                <PlayerInput handleTeam={handleTeamOne} playerNum={'2'} />
                <PlayerInput handleTeam={handleTeamOne} playerNum={'3'} />
                <PlayerInput handleTeam={handleTeamOne} playerNum={'4'} />
                <PlayerInput handleTeam={handleTeamOne} playerNum={'5'} />
            </div>
            {showTeamTwo ? <div className='team-divider'></div> : ''}
            {showTeamTwo ? 
            <div className='team-container'>
                <div className='form-container'>
                    <h2>Team 2</h2>
                    <select onChange={(e) => {handleResult(e)}} name="team2" id="result" defaultValue='DEFAULT'>
                        <option value="DEFAULT">-- Result --</option>
                        <option value="win">Winner</option>
                        <option value="loss">Loser</option>
                    </select>
                </div>
                <PlayerInput handleTeam={handleTeamTwo} playerNum={'6'} />
                <PlayerInput handleTeam={handleTeamTwo} playerNum={'7'} />
                <PlayerInput handleTeam={handleTeamTwo} playerNum={'8'} />
                <PlayerInput handleTeam={handleTeamTwo} playerNum={'9'} />
                <PlayerInput handleTeam={handleTeamTwo} playerNum={'10'} />
            </div> : '' }
            </div>
            <p className='toggle-team' onClick={handleShowTeams}>{showTeamTwo ? 'Remove' : 'Add'} Team Two</p>
            <div className='divider'></div>    
            <button type='submit'>Add Game</button>
        </form>
      </div>
    )
  }
  
export default AddGame;