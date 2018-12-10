import io, { Socket } from 'socket.io';
import { Game, EndState } from './Game'
import { DB } from '../Database/DB';
import { TicTacToe } from './TicTacToe';
import { Chess } from './Chess';

enum Turn {
    Player1 = 0,
    Player2 = 1
}

var sockets = new Map<string, io.Server>();

export abstract class GameController {
    game: Game;
    players: Array<string> = new Array();
    turn: Turn = Turn.Player1;
    room: string;
    io: io.Server

    constructor(game: Game, player1: string, player2: string, io: io.Server) {
        this.game = game;
        this.players.push(player1, player2)
        var pstring = `${player1}:${player2}:${game}`;
        this.io = io;
        sockets.set(pstring, this.io);
        this.room = `${game.name}:${player1}:${player2}`
    }

    abstract parseMove(j: any): void

    sendState() {
        var e = {
            boardState: this.game.render(),
            gameState: this.game.state,
            players: this.players,
            turn: this.turn,
            game: this.game.name
        }
        this.io.in(this.room).emit('state', e);
    }

    protected get currentPlayer() {
        return this.players[this.turn];
    }
}

export class TicTacToeController extends GameController {
    constructor(player1: string, player2: string, io: io.Server) {
        super(new TicTacToe(), player1, player2, io);
    }

    parseMove(j: any) {
        if (j['player'] != this.currentPlayer && this.game.state != EndState.inProgress) {
            return;
        }
        if (j['player'] == this.players[0]) {
            j['piece'] = 'X'
        } else {
            j['piece'] = 'O'
        }
        if (this.game.parseMove(j)) {
            this.turn = Math.abs(this.turn - 1); // 0 -> 1, 1 -> 0
        }
        this.sendState();
    }
}

export class ChessController extends GameController {
    constructor(player1: string, player2: string, io: io.Server) {
        super(new Chess(), player1, player2, io);
    }
    parseMove(j: any) {

    }
}