abstract class Game {

}

export abstract class BoardGame extends Game{
    board: Board;

    constructor(n: number) {
        super();
        this.board = new Board(n);
    }

    toString(){
        return this.board.toString();
    }
}

abstract class Piece{
    type: String;

    constructor(t: String){
        this.type = t
    }
}

class _Nothing extends Piece{
    constructor(){
        super("Nothing");
    }
}

var Nothing = new _Nothing();

class Board {
    tiles: Tile[][] = new Array<Array<Tile>>();
    constructor(n: number) {
        this.tiles.length = n
        for (let i: number = 0; i < n; i++) {
            this.tiles[i] = new Array<Tile>();
            for (let j: number = 0; j < n; j++) {
                this.tiles[i][j] = new Tile();
            }
        }
    }

    toString() {
        let s = "";
        let n: number = this.tiles.length;
        for (let i: number = 0; i < n; i++) {
            for (let j: number = 0; j < n; j++) {
                s += this.tiles[i][j];
            }
        }
        return s;
    }
}

class Tile {
    piece:Piece;
    constructor(p?: Piece){
        this.piece = p || Nothing;
    }
    toString() {
        return this.piece;
    }
}
