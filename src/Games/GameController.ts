import { Game } from './Game'

class GameController {
    game: Game;
    p1: number;
    p2: number;
    p1Socket: any;
    p2Socket: any;

    constructor(game: Game, player1: number, player2: number) {
        this.game = game;
        this.p1 = player1;
        this.p2 = player2;
    }
}