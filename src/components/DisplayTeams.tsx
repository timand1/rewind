import '../styles/_displayTeams.scss';
import { playerObj } from '../models/data'

interface DisplayTeamProps {
    player: playerObj;
}


export default function DisplayTeams(props: DisplayTeamProps) { 
    const player = Object.values(props.player)[0]
    const playerInfo = Object.values(props.player)[1]
    
    return (         
        <section className='player-info'>             
            <p>{player}</p>
            <p>{playerInfo}</p>
        </section>
    )
};