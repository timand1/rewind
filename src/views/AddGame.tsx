import '../styles/_addGame.scss';
import Nav from '../components/Nav';
import { useState } from 'react';
import { Games } from '../models/data'




function AddGame() {
    const [newGame, setNewGame] = useState<Games>();

    const [teamOne, setTeamOne] = useState<Array<string>>([]);
    const [teamTwo, setTeamTwo] = useState<Array<string>>([]);
    const [game, setGame] = useState<string>('');
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [duration, setDuration] = useState<string>('');

    const handleSubmit: (e:any) => void = (e) => {
        setNewGame({
            game: game,
            team1: teamOne,
            team2: teamTwo,
            win: winner,
            lost: loser,
            date: date,
            duration: duration,
            gameId: (Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)).toString()
        })
    }

    const handleGame: (e:any) => void = (e) => {
        setGame(e.target.value);
    }

    const handleTeamOne: (e:any) => void = (e) => {
        setGame(e.target.value);
    }

    const handleTeamTwo: (e:any) => void = (e) => {
        setGame(e.target.value);
    }

    const handleWinner: (e:any) => void = (e) => {
        setGame(e.target.value);
    }

    const handleLoser: (e:any) => void = (e) => {
        setGame(e.target.value);
    }

    const handleDate: (e:any) => void = (e) => {
        setGame(e.target.value);
    }


    return (
      <div className="add-game">
        <Nav />
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => {handleGame(e)}} name="game" id="game" defaultValue='DEFAULT'>
                <option value="DEFAULT">-- Choose a game --</option>
                <option value="Dota 2">Dota 2</option>
                <option value="Dota 2">World of Warcraft</option>
                <option value="Dota 2">Tower Defence</option>
            </select>
            <input type="date" name="date" id="date" />
            <input type="time" name="duration" id="duration" />
            <input type="text" name="winner" id="winner" />
            <input type="text" name="loser" id="loser" />
            <div>
            <h2>Team 1</h2>
                <div>
                    <label htmlFor="player">Player</label>
                    <input type="text" name="player" id="player" />
                </div>
                <p>Add player</p>
            </div>
            <div>
            <h2>Team 2</h2>
                <p>Add player</p>
            </div>
            
            <button type='submit'>Add Game</button>
        </form>
      </div>
    )
  }
  
export default AddGame;