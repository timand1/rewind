import '../styles/_displayTeams.scss';

interface DisplayTeamProps {
    player: object;
}


export default function DisplayTeams(props: DisplayTeamProps) { 
    const player = Object.values(props.player)[0]
    const playerInfo = Object.values(props.player)[1]
    
    return (         
        <section className='teams'>             
            <p>{player}</p>
            <p>{playerInfo}</p>
        </section>
    )
};