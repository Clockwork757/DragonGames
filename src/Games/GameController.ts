import io, { Socket } from 'socket.io';
import { Game } from './Game'
import { DB } from '../Database/DB';
import { TicTacToe } from './TicTacToe';
import { Chess } from './Chess';

enum Turn {
    Player1, Player2
}

var sockets = new Map<string, io.Server>();

export abstract class GameController {
    game: Game;
    p1: string;
    p2: string;
    turn: Turn = Turn.Player1;
    room: string;
    io: io.Server

    constructor(game: Game, player1: string, player2: string, io: io.Server) {
        this.game = game;
        this.p1 = player1;
        this.p2 = player2;
        var pstring = `${player1}:${player2}:${game}`;
        this.io = io;
        sockets.set(pstring, this.io);
        this.room = `${game.name}:${player1}:${player2}`
    }

    abstract parseMove(j: any): void

    sendState() {
        this.io.in(this.room).emit('state', { boardState: this.game.render(), gameState: this.game.checkEnd() });
    }
}

export class TicTacToeController extends GameController {
    constructor(player1: string, player2: string, io: io.Server) {
        super(new TicTacToe(), player1, player2, io);
    }

    parseMove(j: any) {
        //console.log(j['player'] == this.p1, this.p1);
        if (j['player'] == this.p1) {
            j['piece'] = 'X'
        } else {
            j['piece'] = 'O'
        }
        console.log(j);
        this.game.parseMove(j);
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