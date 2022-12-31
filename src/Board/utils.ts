import { Board } from "./types";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const defaultBoard: Board = {
    players: [{
        isActive: true,
        numWins:0,
        isWinner:false,
        id: 1,
        name: 'Player 1',
        currentRoundScore: 0,
        overallScore: 0
    },
    {
        isActive: false,
        numWins:0,
        isWinner:false,
        id: 2,
        name: 'Player 2',
        currentRoundScore: 0,
        overallScore: 0
    }
    ],
    goalScore: 20,
    dice1: null,
    dice2: null
};