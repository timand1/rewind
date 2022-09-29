import { useState, ChangeEvent } from 'react';
import { playerObj } from '../models/data';


interface AddPlayerProps {
    handleTeam: (updatedPlayer: playerObj, index: number) => void;
    player: playerObj;
    playerNum: number;
    required?: boolean;
    setTeam: (team : playerObj[]) => void;
};

export default function AddPlayer(props: AddPlayerProps) {    
    const [updatedPlayer, setUpdatedPlayer] = useState<playerObj>(props.player);

    let playerIndex = props.playerNum - 1;

    if(playerIndex > 4) {
        playerIndex = playerIndex - 5;
    };

    const handleInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
        let playerCopy: playerObj = updatedPlayer

        if(e.target.name == 'player') {            
            playerCopy.player = e.target.value;
        } else {
            playerCopy.info = e.target.value;
        };

        setUpdatedPlayer(updatedPlayer);
        
        props.handleTeam(updatedPlayer, playerIndex)
    };

    return (         
        <div className="teams">
            <div>
                <p>Player {props.playerNum} {props.required ? '*' : ''} </p>
                <input type="text" name="player" placeholder={props.player.player} id="player" 
                    defaultValue={props.player.player} required={props.required} onChange={(e) => {handleInput(e)}}
                />
            </div>
            <div>
                <p>Player {props.playerNum} info</p>
                <textarea rows={2} name="info" placeholder={props.player.info} id="info" 
                    defaultValue={props.player.info} onChange={(e) => {handleInput(e)}}
                />
            </div>
        </div>
    )
};