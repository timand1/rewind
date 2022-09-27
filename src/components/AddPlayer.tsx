interface AddPlayerProps {
    handleTeam: (e:any, index: number) => void;
    player: any;
    playerNum: number;
    required?: boolean;
}


export default function DisplayTeams(props: AddPlayerProps) {    
    let playerIndex = props.playerNum - 1;

    if(playerIndex > 4) {
        playerIndex = playerIndex - 5;
    };

    return (         
        <div className="teams">
        <div>
            <p>Player {props.playerNum} {props.required ? '*' : ''} </p>
            <input type="text" name="player" placeholder={`Player ${props.playerNum} name`} id={`player-${props.playerNum}`} defaultValue={props.player[`player-${props.playerNum}`]} required={props.required} onKeyUp={(e) => {props.handleTeam(e, playerIndex)}}/>
        </div>
        <div>
            <p>Player {props.playerNum} info</p>
            <textarea rows={2} name="player-info" placeholder={`Player ${props.playerNum} info`} id={`player-${props.playerNum}-info`} defaultValue={props.player[`player-${props.playerNum}-info`]} onKeyUp={(e) => {props.handleTeam(e, playerIndex)}}/>
        </div>
    </div>
    )
};