import { TicTacToe } from "./TicTacToe";
import { Game } from "./Game";
import { Chess } from "./Chess";

export function gameGetter(s: string): Game {
    if (['ttt', 'tictactoe', 'TicTacToe'].includes(s)) {
        return new TicTacToe();
    } else {
        return new Chess();
    }
}
