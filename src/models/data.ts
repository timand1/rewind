export interface Games {
    game: string,
    duration: string,
    team1: playerObj[],
    team2: playerObj[],
    date: string,
    win: string,
    lost: string,
    gameId: string,
    image: string
}

export interface playerObj {
    player : string;
    info: string;
}

export interface User {
    name: string,
    win: number,
    lost: number,
    amountOfGames: number,
    winRate: number
}