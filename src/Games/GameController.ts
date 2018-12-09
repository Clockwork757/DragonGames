import { Game } from './Game'
import { Socket } from 'socket.io';
import { EventEmitter } from 'events';

class GameController extends EventEmitter{
    game: Game;
    p1: number;
    p2: number;
    //p1Socket: Socket;
    //p2Socket: Socket;

    constructor(game: Game, player1: number, player2: number) {
        super();
        this.game = game;
        this.p1 = player1;
        this.p2 = player2;
    }
}