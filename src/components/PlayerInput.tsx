import {useEffect, useState, ChangeEvent } from 'react'
import { playerObj } from '../models/data'

interface PlayerInputProps {
    required? : boolean;
    playerNum : string;
    handleTeam : (player:playerObj, index: number) => void;
}

export default function PlayerInput(props: PlayerInputProps) { 
    
    const [player, setPlayer] = useState<playerObj>({player: '', info: ''})
    let playerIndex = parseInt(props.playerNum) - 1;
    if(playerIndex >= 5) {
        playerIndex = playerIndex - 5;
    }
    const handlePlayer: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {       
        setPlayer(prevPlayer => ({...prevPlayer, [e.target.name] : e.target.value.toLowerCase()}));
        props.handleTeam(player, playerIndex);
    };
    
    useEffect(() => {
        if(player) {
            props.handleTeam(player, playerIndex);
        };
    }, [player])

    return (         
        <section className="player-container">
            <div className='form-container'>
                <label htmlFor={"player"} >Player {props.playerNum} {props.required ? '*' : ''}</label>
                <input type="text" name="player" placeholder={`Player ${props.playerNum}`} id="player" onChange={(e) => {handlePlayer(e)}} required={props.required} />
            </div>
            <div className='form-container'>
                <label htmlFor={"info"}>Player Info</label>
                <textarea name={"info"} placeholder={`Player ${props.playerNum} info`} id="info" onChange={(e) => {handlePlayer(e)}}></textarea>
            </div>
        </section>
    )
};