import io, { Socket } from 'socket.io';
import { Game } from './Game'
import { EventEmitter } from 'events';
import { DB } from '../Database/DB';

export abstract class GameController extends EventEmitter {
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
                socket.on('move', (move) => {
                    console.log(`got move from: ${move['player']}`)
                    this.parseMove(move);
                })
                socket.join(this.room, (err: Error) => {
                    this.sendState();
                    if (err) {
                        console.log(err);
                    }
                });
            })
        });
    }

    abstract parseMove(j: any): void

    sendState() {
        console.log('sending game state to client');
        this.io.in(this.room).emit('state', this.game.render());
    }
}

export class TicTacToeController extends GameController {
    constructor(game: Game, player1: string, player2: string, io: io.Server) {
        super(game, player1, player2, io);
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