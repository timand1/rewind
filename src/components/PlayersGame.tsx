interface PlayersGameProps {
    player: string;
}


export default function PlayersGame(props: PlayersGameProps) { 
   
    return (         
        <section className='players'>             
                <p>{props.player}</p>
        </section>
    )
};