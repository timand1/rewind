interface AddPlayerProps {
    handleTeam: any;
    teamArr: any;
    playerNum: any;
    required?: boolean;
}


export default function DisplayTeams(props: AddPlayerProps) { 
    
    return (         
        <div className="teams">
        <div>
            <p>Player {props.playerNum}</p>
            <input type="text" name="player" placeholder={`Player${props.playerNum} name`} id={`player${props.playerNum}`} defaultValue={props.teamArr[0]['player-1']} required={props.required} onKeyUp={(e) => {props.handleTeam(e, 0)}}/>
        </div>
        <div>
            <p>Player {props.playerNum} info</p>
            <textarea rows={2} name="player-info" placeholder={`Player ${props.playerNum} info`} id="player-1-info" defaultValue={props.teamArr[0]['player-1-info']} onKeyUp={(e) => {props.handleTeam(e, 0)}}/>
        </div>
    </div>
    )
};