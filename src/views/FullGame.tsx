import '../styles/_fullGame.scss';
import change from '../assets/change.svg';
import Nav from '../components/Nav';
import DisplayTeams from '../components/DisplayTeams'
import { Games } from '../models/data'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {actions as gameActions} from '../features/gameReducer';

type MyParams = {
    id: string;
  };

interface TeamArray {
    name: string;
    info: string;
};

interface UpdatedGame {
    game: string;
    date: string;
    duration : string;
    win : string;
    lost : string;
    team1 : TeamArray[];
    team2 : TeamArray[];
    gameId? : string;
};


export default function FullGame() { 
    const { id } = useParams<keyof MyParams>() as MyParams;

    const dispatch = useDispatch();
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
                }
                
            };
        };
    }, []);    
    
    const [chosenGame, setChosenGame] = useState<Games>();
    const [newGame, setNewGame] = useState<string>('');
    const [newDate, setNewDate] = useState<string>('');
    const [newDuration, setNewDuration] = useState<string>('');
    const [newWinner, setNewWinner] = useState<string>('');
    const [newLoser, setNewLoser] = useState<string>('');
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


        for(let i = 0; i < chosenGame.team1.length ; i ++) {
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

    const handleTeamOne: (e:any, index:number) => void = (e, index) => {
        const {name, value} = e.target;
        if(name == 'player') {
            teamOneArr[index][`player-${index+1}`] = value.toLowerCase();
        } else {
            teamOneArr[index][`player-${index+1}-info`] = value.toLowerCase();
        };
    };

    const handleTeamTwo: (e:any, index:number) => void = (e, index) => {
        const {name, value} = e.target;
        
        if(name == 'player') {
            teamTwoArr[index][`player-${index+6}`] = value.toLowerCase();
        } else {
            teamTwoArr[index][`player-${index+6}-info`] = value.toLowerCase();
        };
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
            team1 : teamOneArr,
            team2 : teamTwoArr,
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

    return (         
        <section className='full-game'>
            <Nav />
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
                    {chosenGame?.win ? <p>Winner : {chosenGame?.win}</p> : ''}
                    {chosenGame?.lost ? <p>Loser : {chosenGame?.lost}</p> : ''}
                </div>
                <div className='team-list'>
                    <h3>Team 1</h3>
                    {teamOneEl}
                </div>
                {checkTeamTwo ? 
                    <div className='team-list'>
                        <h3>Team 2</h3>
                        {teamTwoEl}
                    </div>
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
                    <div className="teams">
                        <div>
                            <p>Player 1</p>
                            <input type="text" name="player" id="player-1" defaultValue={teamOneArr[0]['player-1']} required onKeyUp={(e) => {handleTeamOne(e, 0)}}/>
                        </div>
                        <div>
                            <p>Player 1 info</p>
                            <input type="text" name="player-info" id="player-1-info" defaultValue={teamOneArr[0]['player-1-info']} onKeyUp={(e) => {handleTeamOne(e, 0)}}/>
                        </div>
                    </div>
                    <div className="teams">
                        <div>
                            <p>Player 2</p>
                            <input type="text" name="player" id="player-2" defaultValue={teamOneArr[1]['player-2']} onKeyUp={(e) => {handleTeamOne(e, 1)}}/>
                        </div>
                        <div>
                            <p>Player 2 info</p>
                            <input type="text" name="player-info" id="player-2-info" defaultValue={teamOneArr[1]['player-2-info']} onKeyUp={(e) => {handleTeamOne(e, 1)}}/>
                        </div>
                    </div>
                    <div className="teams">
                        <div>
                            <p>Player 3</p>
                            <input type="text" name="player" id="player-3" defaultValue={teamOneArr[2]['player-3']} onKeyUp={(e) => {handleTeamOne(e, 2)}}/>
                        </div>
                        <div>
                            <p>Player 3 info</p>
                            <input type="text" name="player-info" id="player-3-info" defaultValue={teamOneArr[2]['player-3-info']} onKeyUp={(e) => {handleTeamOne(e, 2)}}/>
                        </div>
                    </div>
                    <div className="teams">
                        <div>
                            <p>Player 4</p>
                            <input type="text" name="player" id="player-4" defaultValue={teamOneArr[3]['player-4']} onKeyUp={(e) => {handleTeamOne(e, 3)}}/>
                        </div>
                        <div>
                            <p>Player 4 info</p>
                            <input type="text" name="player-info" id="player-4-info" defaultValue={teamOneArr[3]['player-4-info']} onKeyUp={(e) => {handleTeamOne(e, 3)}}/>
                        </div>
                    </div>
                    <div className="teams">
                        <div>
                            <p>Player 5</p>
                            <input type="text" name="player" id="player-5" defaultValue={teamOneArr[4]['player-5']} onKeyUp={(e) => {handleTeamOne(e, 4)}}/>
                        </div>
                        <div>
                            <p>Player 5 info</p>
                            <input type="text" name="player-info" id="player-5-info" defaultValue={teamOneArr[4]['player-5-info']} onKeyUp={(e) => {handleTeamOne(e, 4)}}/>
                        </div>
                    </div>
                </div>
                    <div className='team-list'>
                        <h3>Team 2</h3>
                        <div className="teams">
                            <div>
                                <p>Player 1</p>
                                <input type="text" name="player" id="player-6" defaultValue={teamTwoArr[0]['player-6']} onKeyUp={(e) => {handleTeamTwo(e, 0)}}/>
                            </div>
                            <div>
                                <p>Player 1 info</p>
                                <input type="text" name="player-info" id="player-6-info" defaultValue={teamTwoArr[0]['player-6-info']} onKeyUp={(e) => {handleTeamTwo(e, 0)}} />
                            </div>
                        </div>
                        <div className="teams">
                            <div>
                                <p>Player 2</p>
                                <input type="text" name="player" id="player-7" defaultValue={teamTwoArr[1]['player-7']} onKeyUp={(e) => {handleTeamTwo(e, 1)}} />
                            </div>
                            <div>
                                <p>Player 2 info</p>
                                <input type="text" name="player-info" id="player-7-info" defaultValue={teamTwoArr[1]['player-7-info']} onKeyUp={(e) => {handleTeamTwo(e, 1)}} />
                            </div>
                        </div>
                        <div className="teams">
                            <div>
                                <p>Player 3</p>
                                <input type="text" name="player" id="player-8" defaultValue={teamTwoArr[2]['player-8']} onKeyUp={(e) => {handleTeamTwo(e, 2)}} />
                            </div>
                            <div>
                                <p>Player 3 info</p>
                                <input type="text" name="player-info" id="player-8-info" defaultValue={teamTwoArr[2]['player-8-info']} onKeyUp={(e) => {handleTeamTwo(e, 2)}} />
                            </div>
                        </div>
                        <div className="teams">
                            <div>
                                <p>Player 4</p>
                                <input type="text" name="player" id="player-9" defaultValue={teamTwoArr[3]['player-9']} onKeyUp={(e) => {handleTeamTwo(e, 3)}} />
                            </div>
                            <div>
                                <p>Player 4 info</p>
                                <input type="text" name="player-info" id="player-9-info" defaultValue={teamTwoArr[3]['player-9-info']} onKeyUp={(e) => {handleTeamTwo(e, 3)}} />
                            </div>
                        </div>
                        <div className="teams">
                            <div>
                                <p>Player 5</p>
                                <input type="text" name="player" id="player-10" defaultValue={teamTwoArr[4]['player-10']} onKeyUp={(e) => {handleTeamTwo(e, 4)}} />
                            </div>
                            <div>
                                <p>Player 5 info</p>
                                <input type="text" name="player-info" id="player-10-info" defaultValue={teamTwoArr[4]['player-10-info']} onKeyUp={(e) => {handleTeamTwo(e, 4)}} />
                            </div>
                        </div>

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