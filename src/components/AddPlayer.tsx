import { useState, ChangeEvent } from 'react';

interface AddPlayerProps {
    handleTeam: (updatedPlayer: object, index: number) => void;
    player: any;
    playerNum: number;
    required?: boolean;
    setTeam: (team : Array<object>) => void;
};

export default function DisplayTeams(props: AddPlayerProps) {    
    let playerIndex = props.playerNum - 1;

    const [updatedPlayer, setUpdatedPlayer] = useState<object>(props.player)
    const handleInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
        let playerCopy:any = updatedPlayer
        if(e.target.name.includes('info')) {            
            playerCopy[`player-${props.playerNum}-info`] = e.target.value;
        } else {
            playerCopy[`player-${props.playerNum}`] = e.target.value;
        };

        setUpdatedPlayer(updatedPlayer);
        
        props.handleTeam(updatedPlayer, playerIndex)
    };

    if(playerIndex > 4) {
        playerIndex = playerIndex - 5;
    };

    return (         
        <div className="teams">
            <div>
                <p>Player {props.playerNum} {props.required ? '*' : ''} </p>
                <input type="text" name={`player-${props.playerNum}`} placeholder={`Player ${props.playerNum} name`} id={`player-${props.playerNum}`} 
                    defaultValue={props.player[`player-${props.playerNum}`]} required={props.required} onChange={(e) => {handleInput(e)}}
                />
            </div>
            <div>
                <p>Player {props.playerNum} info</p>
                <textarea rows={2} name={`player-${props.playerNum}-info`} placeholder={`Player ${props.playerNum} info`} id={`player-${props.playerNum}-info`} 
                    defaultValue={props.player[`player-${props.playerNum}-info`]} onChange={(e) => {handleInput(e)}}
                />
            </div>
        </div>
    )
};