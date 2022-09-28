import '../styles/_fullGame.scss';
import change from '../assets/change.svg';
import Nav from '../components/Nav';
import DisplayTeams from '../components/DisplayTeams';
import AddPlayer from '../components/AddPlayer';
import { Games } from '../models/data';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type MyParams = {
    id: string;
  };

interface UpdatedGame {
    game: string;
    date: string;
    duration : string;
    win : string;
    lost : string;
    team1 : object[];
    team2 : object[];
    gameId? : string;
};


export default function FullGame() { 
    const { id } = useParams<keyof MyParams>() as MyParams;

    const navigate = useNavigate()

    useEffect(() => {
        getGame();
        async function getGame() {
            setLoading(true);
  
            const response = await fetch(`https://wool-fir-ping.glitch.me/api/games/${id}`, {
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            
            if (data.success) {
                setLoading(false);
                if(data.game.length == 0) {
                    navigate('/')
                } else {
                    setChosenGame(data.game[0]);
                    setNewGame(data.game[0].game);
                    setNewDate(data.game[0].date);
                    setNewDuration(data.game[0].duration);
                    setNewWinner(data.game[0].win);
                    setNewLoser(data.game[0].lost);
                    setNewTeamOne(data.game[0].team1);
                    setNewTeamTwo(data.game[0].team2);
                }                
            };
        };
    }, []);    
    
    const [chosenGame, setChosenGame] = useState<Games>();
    const [newGame, setNewGame] = useState<string>(chosenGame?.game || '');
    const [newDate, setNewDate] = useState<string>(chosenGame?.date || '');
    const [newDuration, setNewDuration] = useState<string>(chosenGame?.duration || '');
    const [newWinner, setNewWinner] = useState<string>(chosenGame?.win || '');
    const [newLoser, setNewLoser] = useState<string>(chosenGame?.lost || '');
    const [newTeamOne, setNewTeamOne] = useState<Array<object>>(chosenGame?.team1 || []);
    const [newTeamTwo, setNewTeamTwo] = useState<Array<object>>(chosenGame?.team2 || []);
    const [changeGame, setChangeGame] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    let teamOneEl: any;
    let teamTwoEl: any;
    let checkTeamTwo: boolean = false;
    const teamOneArr: Array<any> = [];
    const teamTwoArr: Array<any> = [];
    
    if(chosenGame) {
        checkTeamTwo = chosenGame.team2.length > 0 ? true : false;
        teamOneEl = chosenGame.team1.map((player, index) => <DisplayTeams key={index} player={player} />);
        teamTwoEl = chosenGame.team2.map((player, index) => <DisplayTeams key={index} player={player} />);
        

        for(let i = 0; i < chosenGame.team1.length ; i++) {
            const playerValue = {
                [`player-${i + 1}`] : Object.values(chosenGame.team1[i])[0],
                [`player-${i + 1}-info`]: Object.values(chosenGame.team1[i])[1]
            };
    
            teamOneArr.push(playerValue)
        };
        for(let j = 0; j < 5 - chosenGame.team1.length; j++) {
            const addedIndex = chosenGame.team1.length + 1
            const playerValue = {
                [`player-${j + addedIndex}`] : '',
                [`player-${j + addedIndex}-info`] : ''
            };
            teamOneArr.push(playerValue);
        };
    
        for(let i = 0; i < chosenGame.team2.length ; i ++) {
            const playerValue = {
                [`player-${i + 6}`] : Object.values(chosenGame.team2[i])[0],
                [`player-${i + 6}-info`]: Object.values(chosenGame.team2[i])[1]
            };
    
            
            teamTwoArr.push(playerValue);
        };
        for(let j = 0; j < 5 - chosenGame.team2.length; j++) {
            const addedIndex = chosenGame.team2.length + 6;
            const playerValue = {
                [`player-${j + addedIndex}`] : '',
                [`player-${j + addedIndex}-info`] : ''
            };
            teamTwoArr.push(playerValue);
        };
    }
    

    const handleChange: () => void = () => {
        setChangeGame(true);
    };

    const handleCancel: () => void = () => {
        setChangeGame(false);
    };

    const handleTeamOne: (updatedPlayer:object, index:number) => void = (updatedPlayer, index) => {
        const teamCopy = [...newTeamOne];        
        teamCopy[index] = updatedPlayer;
        setNewTeamOne([...teamCopy]);
    };
    
    const handleTeamTwo: (updatedPlayer:object, index:number) => void = (updatedPlayer, index) => {
        const teamCopy = [...newTeamTwo];        
        teamCopy[index] = updatedPlayer;
        setNewTeamTwo([...teamCopy]);
    };

    const handleGame: (e:any) => void = (e) => {
        setNewGame(e.target.value);  
        
    };
    const handleDate: (e:any) => void = (e) => {
        setNewDate(e.target.value);
    };
    const handleDuration: (e:any) => void = (e) => {
        setNewDuration(e.target.value);
    };
    const handleWinner: (e:any) => void = (e) => {
        setNewWinner(e.target.value);
    };
    const handleLoser: (e:any) => void = (e) => {
        setNewLoser(e.target.value);
    };


    async function updateGame() {
        for(let i = 0; i < teamOneArr.length; i++) {           
            if(teamOneArr[i][`player-${i+1}`] == '') {
                teamOneArr.splice(i);
            };
        };
        
        for(let j = 0; j < teamTwoArr.length; j++) {                       
            if(teamTwoArr[j][`player-${j+6}`] == '') {
                teamTwoArr.splice(j);
            };
        };

        setLoading(true);
        const updatedGame: UpdatedGame = {
            game: newGame,
            date: newDate,
            duration : newDuration,
            win : newWinner,
            lost : newLoser,
            team1 : newTeamOne,
            team2 : newTeamTwo,
            gameId : id
        };
        
          const response = await fetch(`https://wool-fir-ping.glitch.me/api/games/${id}`, {
            method: 'POST',
            body: JSON.stringify(updatedGame),
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();
          if (data.success) {
            setChangeGame(false)
            await getGame();            
          };
    };

    async function getGame() {
        const response = await fetch(`https://wool-fir-ping.glitch.me/api/games/${id}`, {
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        
        if (data.success) {
            setChosenGame(data.game[0])             
            setLoading(false);
        };
    };

    let winner: string = '-';
    if(chosenGame?.win == 'team1') {
        winner = 'Team 1';
    } else if(chosenGame?.win == 'team2') {
        winner = 'Team 2';
    };

    let loser: string = '-';
    if(chosenGame?.lost == 'team1') {
        loser = 'Team 1';
    } else if(chosenGame?.lost == 'team2') {
        loser = 'Team 2';
    };

    return (         
        <section className='full-game'>
            <Nav />
                {loading ? 
                    <div className='loading'></div>
                    : ''
                }
            {!changeGame ?
            <section className='game-container'>
                <div className="game-headline">
                    <h2>{chosenGame?.game}</h2>
                    <img className='change-game' src={change} alt="change" onClick={handleChange}/>
                </div>
                <div className="game-info">
                    <p>Duration : {chosenGame?.duration.slice(1)}</p>
                    <p>Date : {chosenGame?.date.slice(2)}</p>
                </div>
                <div className="game-info">
                    <p>Winner : {winner}</p>
                    <p>Loser : {loser}</p>
                </div>
                    <h3 className='team-headline'>Team 1</h3>
                    <div className='team-list'>
                    {teamOneEl}
                </div>
                {checkTeamTwo ? 
                    <>
                        <h3 className='team-headline'>Team 2</h3>
                        <div className='team-list'>
                            {teamTwoEl}
                        </div>
                    </>
                : ''}
            </section>
            :
            <section className='game-container'>
                    {loading ? 
                        <div className='loading'></div>
                        : ''
                    }
                <h2>Update game {id}</h2>
                <div className="game-info">
                    <div>
                        <p>Game</p>
                        <select name="game" id="game" defaultValue={chosenGame?.game} onChange={(e) => {handleGame(e)}}>
                            <option value="Dota 2">Dota 2</option>
                            <option value="World of Warcraft">World of Warcraft</option>
                            <option value="Tower Defence">Tower Defence</option>
                        </select>
                    </div>
                </div>
                <div className="game-info">
                    <div>
                        <p>Duration</p>
                        <input type="time" step={2} name="duration" id="duration" defaultValue={chosenGame?.duration} onChange={(e) => {handleDuration(e)}} required/>
                    </div>
                    <div>
                        <p>Date</p>
                        <input type="date" name="date" id="date" defaultValue={chosenGame?.date} onChange={(e) => {handleDate(e)}} required/>
                    </div>
                </div>
                <div className="game-info">
                    <div>
                        <p>Winner</p>
                        <select name="team1" id="result" defaultValue={chosenGame?.win} onChange={(e) => {handleWinner(e)}}>
                            <option value="">None</option>
                            <option value="team1">Team 1</option>
                            <option value="team2">Team 2</option>
                        </select>
                    </div>
                    <div>
                        <p>Loser</p>
                        <select name="team1" id="result" defaultValue={chosenGame?.lost} onChange={(e) => {handleLoser(e)}}>
                            <option value="">None</option>
                            <option value="team1">Team 1</option>
                            <option value="team2">Team 2</option>
                        </select>
                    </div>
                </div>
                <div className='team-list'>
                    <h3>Team 1</h3>
                    <AddPlayer handleTeam={handleTeamOne} player={teamOneArr[0]} playerNum={1} setTeam={setNewTeamOne} required={true} />
                    <AddPlayer handleTeam={handleTeamOne} player={teamOneArr[1]} playerNum={2} setTeam={setNewTeamOne}  />
                    <AddPlayer handleTeam={handleTeamOne} player={teamOneArr[2]} playerNum={3} setTeam={setNewTeamOne}  />
                    <AddPlayer handleTeam={handleTeamOne} player={teamOneArr[3]} playerNum={4} setTeam={setNewTeamOne}  />
                    <AddPlayer handleTeam={handleTeamOne} player={teamOneArr[4]} playerNum={5} setTeam={setNewTeamOne}  />
                </div>
                <div className='team-list'>
                    <h3>Team 2</h3>
                    <AddPlayer handleTeam={handleTeamTwo} player={teamTwoArr[0]} playerNum={6} setTeam={setNewTeamTwo}  />
                    <AddPlayer handleTeam={handleTeamTwo} player={teamTwoArr[1]} playerNum={7} setTeam={setNewTeamTwo} />
                    <AddPlayer handleTeam={handleTeamTwo} player={teamTwoArr[2]} playerNum={8} setTeam={setNewTeamTwo} />
                    <AddPlayer handleTeam={handleTeamTwo} player={teamTwoArr[3]} playerNum={9} setTeam={setNewTeamTwo} />
                    <AddPlayer handleTeam={handleTeamTwo} player={teamTwoArr[4]} playerNum={10} setTeam={setNewTeamTwo} />
                </div>
                <div className="button-container">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={updateGame}>Update</button>
                </div>
            </section>
            }
        </section>
    )
};