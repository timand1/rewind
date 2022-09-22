export interface Games {
    game: string,
    duration: string,
    team1: Array<object>,
    team2: Array<object>,
    date: string,
    win: string,
    lost: string,
    gameId: string
}

export interface User {
    name: string,
    win: number,
    lost: number,
    amountOfGames: number,
    winRate: number
}