import '../styles/_addGame.scss';
import Nav from '../components/Nav';
import PlayerInput from '../components/PlayerInput';
import { playerObj, Games } from '../models/data';
import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {actions as gameActions} from '../features/gameReducer';

function AddGame() {
    const dispatch = useDispatch();

    const [showTeamTwo, setShowTeamTwo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [teamOne, setTeamOne] = useState<playerObj[]>([]);
    const [teamTwo, setTeamTwo] = useState<playerObj[]>([]);
    const [game, setGame] = useState<string>('');
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [addedImage, setAddedImage] = useState<string>('');
    const [addedGame, setAddedGame] = useState<boolean>(false);

    const handleSubmit: (e:any) => void = (e) => {
        e.preventDefault();
        setShowTeamTwo(false);
        setAddedGame(true);

        const teamOneCopy = [...teamOne];
        for(let i = teamOneCopy.length - 1; i >= 0; i--) {
            if(teamOneCopy[i] == undefined || teamOneCopy[i].player == '') {
                teamOneCopy.splice(i, 1)
            };
        };

        const teamTwoCopy = [...teamTwo];
        for(let i = teamTwoCopy.length - 1; i >= 0; i--) {
            if(teamTwoCopy[i] == undefined || teamTwoCopy[i].player == '') {
                teamTwoCopy.splice(i, 1)
            };
        };

        const newGame: Games = {
            game: game,
            team1: teamOneCopy,
            team2: teamTwoCopy,
            win: winner,
            lost: loser,
            date: date,
            duration: duration,
            gameId: (Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)).toString(),
            image: addedImage
        };

        addGame(newGame);
    };

    async function addGame(newGame : object) {        
        setLoading(true);
        const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
        method: 'POST',
        body: JSON.stringify(newGame),
        headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.success) {
            await getGames();
            setAddedGame(true);
        };
    };

    async function getGames() {
        const response = await fetch('https://wool-fir-ping.glitch.me/api/games', {
        headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        
        if (data.success) {
          dispatch(gameActions.setAllGames(data.matches))
          setLoading(false);
        };
      };
    
    const handleGame: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => {
        setGame(e.target.value);
    };

    const handleTeamOne: (player:playerObj, index: number) => void = (player, index) => {      
        const teamOneCopy = [...teamOne];
        teamOneCopy[index] = player;
        
        setTeamOne(teamOneCopy);
    };

    const handleTeamTwo: (player:playerObj, index: number) => void = (player, index) => {    
        const teamTwoCopy = [...teamTwo];
        teamTwoCopy[index] = player;
        
        setTeamTwo(teamTwoCopy);
    };

    const handleResult: (e:any) => void = (e) => {
        if(e.target.value === 'win') {
            setWinner(e.target.name);
        } else {
            setLoser(e.target.name);
        };
    };

    const handleDate: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setDate(e.target.value);
    };

    const handleDuration: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setDuration(e.target.value);
    };

    const handleShowTeams: () => void = () => {
        setShowTeamTwo(!showTeamTwo);
        if(showTeamTwo) {
            setTeamTwo([]);
        };
    };

    const handleImage: (e:ChangeEvent<HTMLInputElement>) => void = (e) => {
        if(e.target.files) {
            let file: Blob = e.target.files[0];
    
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const imageString = reader.result;
                if(typeof imageString == 'string') {
                    setAddedImage(imageString);
                }
            };
        }
     }

    const handleAdded: () => void = () => {
        setAddedGame(false);
    };

    const removeImage: () => void = () => {
        setAddedImage('');
    };

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
            <h1>Add game</h1>
            <div className='form-container'>
                <label htmlFor="game">Game</label>
                <select onChange={(e) => {handleGame(e)}} name="game" id="game" defaultValue='DEFAULT' required>
                    <option value="DEFAULT">-- Choose a game --</option>
                    <option value="Dota 2">Dota 2</option>
                    <option value="World of Warcraft">World of Warcraft</option>
                    <option value="Tower Defence">Tower Defence</option>
                </select>
            </div>
            <div className='form-container'>
                <label htmlFor="player">Date</label>
                <input type="date" name="date" id="date" onChange={(e) => {handleDate(e)}} required/>
            </div>
            <div className='form-container'>
                <label htmlFor="player">Duration</label>
                <input type="time" step={1} defaultValue='00:00:00' name="duration" id="duration" onChange={(e) => {handleDuration(e)}} required/>
            </div>
            <div className='form-container'>
                    <div className="add-image">
                        <label htmlFor="gameImage" id='gameImageLabel'>Add image</label>
                        {addedImage.length > 1 ? <p onClick={removeImage}>Remove image</p> : ''}
                    </div>
                        <input type="file" name="gameImage" id='gameImage' accept="image/jpeg, image/png, image/jpg" hidden onChange={(e) => {handleImage(e)}} />
                        {addedImage.length > 1 ? <img className='game-image' src={addedImage} alt="game image" /> : 'No Image'} 
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