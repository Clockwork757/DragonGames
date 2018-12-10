import { GameController, TicTacToeController, ChessController } from "./GameController";
import io from 'socket.io';

export function gameControllerFactory(game: string, username: string, opponent: string, socket: io.Server): GameController {
    if (['ttt', 'tictactoe', 'TicTacToe'].includes(game)) {
        return new TicTacToeController(username, opponent, socket);
    } else if (['Chess', 'chess'].includes(game)) {
        return new ChessController(username, opponent, socket);
    }
    return new TicTacToeController('no', 'no', socket);
}