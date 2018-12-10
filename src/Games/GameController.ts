import io, { Socket } from 'socket.io';
import { Game } from './Game'
import { EventEmitter } from 'events';
import { DB } from '../Database/DB';

//test
abstract class GameController extends EventEmitter {
    game: Game;
    p1: string;
    p2: string;
    room: string;
    io: io.Server

    constructor(game: Game, player1: string, player2: string, io: io.Server) {
        super();
        this.game = game;
        this.p1 = player1;
        this.p2 = player2;
        this.io = io;
        this.room = `${game.name}:${player1}:${player2}`
        let self = this;
        io.on('connection', (socket: Socket) => {
            socket.on('join', (msg) => {
                console.log("joining room")
                console.log(this.room)
                socket.join(this.room, (err: Error) => {
                    if (err) {
                        console.log(err);
                    }
                });
                io.in(this.room).emit('m', 'all');
                socket.to(this.room).emit("m", "in room");
            })
            socket.on('move', (move) => {
                console.log(`got move for game with p1: ${self.p1} p2: ${self.p2}`)
                this.parseMove(move);
            })
        });
    }

    abstract parseMove(j: any): void

    sendState() {
        this.io.to('this.room').emit(this.game.render());
    }
}

export class TicTacToeController extends GameController {
    constructor(game: Game, player1: string, player2: string, io: io.Server) {
        super(game, player1, player2, io);
    }

    parseMove(j: any) {
        if (j['player'] == this.p1) {
            j['piece'] = 'X'
        } else {
            j['piece'] = 'O'
        }
        this.game.parseMove(j);
        this.sendState();
    }
}