export interface Games {
    game: string,
    duration: string,
    team1: Array<string>,
    team2: Array<string>,
    date: string,
    win: string,
    lost: string,
    gameId: string
}

export interface User {
    name: string,
    win: number,
    lost: number,
    userId: string
}