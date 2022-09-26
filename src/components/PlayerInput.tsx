import {useEffect, useState } from 'react'

interface PlayerInputProps {
    required? : boolean;
    playerNum : string;
    handleTeam : (player:any, index: number) => void;
}

export default function PlayerInput(props: PlayerInputProps) { 
    
    const [player, setPlayer] = useState<object>()
    let playerIndex = parseInt(props.playerNum) - 1
    if(playerIndex >= 5) {
        playerIndex = playerIndex - 5
    }
    const handlePlayer: (e:any) => void = (e) => {       
        setPlayer(prevPlayer => ({...prevPlayer, [e.target.name] : e.target.value.toLowerCase()})) 
    }
    
    
    useEffect(() => {
        if(player) {
            props.handleTeam(player, playerIndex)
        }
    }, [player])

    return (         
        <section className="player-container">
            <div className='form-container'>
                <label htmlFor={`player-${props.playerNum}`} >Player {props.playerNum} {props.required ? '*' : ''}</label>
                <input type="text" name={`player-${props.playerNum}`} placeholder={`Player ${props.playerNum} name`} id="player" onKeyUp={(e) => {handlePlayer(e)}} required={props.required} />
            </div>
            <div className='form-container'>
                <label htmlFor={`player-${props.playerNum}`}>Player Info</label>
                <textarea name={`player-${props.playerNum}-info`} placeholder={`Player ${props.playerNum} info`} id="" onKeyUp={(e) => {handlePlayer(e)}}></textarea>
            </div>
        </section>
    )
};