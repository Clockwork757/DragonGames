export abstract class Game {
    constructor() {

    }
}

export abstract class BoardGame extends Game {
    board: Board;
    validPieces: Array<Piece>;
    constructor(n: number, validPieces?: Array<Piece>) {
        super();
        this.validPieces = validPieces || new Array<Piece>();
        this.board = new Board(n);
    }

    parseMove(j: JSON){
        
    }

    place(p: Piece, x: number, y: number) {
        if (!this.validPieces.includes(p)) {
            return
        }
        if (this.getTile(x, y).isEmpty()) {
            this.setTile(p, x, y);
        }
    }

    toString() {
        return this.board.toString();
    }

    getTile(x: number, y: number) {
        return this.board.getTile(x, y);
    }

    setTile(p: Piece, x: number, y: number) {
        this.board.setTile(p, x, y);
    }
}

export abstract class Piece {
    type: String;
    isNothing: Boolean = false;

    constructor(t: String) {
        this.type = t
    }

    toString() {
        return this.type;
    }
}

class _Nothing extends Piece {
    constructor() {
        super("[]");
        this.isNothing = true;
    }
}

export var Nothing = new _Nothing();

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
                s += this.getTile(i, j).toString() + ":\t";
            }
            s += '\n';
        }
        return s;
    }

    getTile(x: number, y: number) {
        return this.tiles[x][y]
    }

    setTile(p: Piece, x: number, y: number) {
        this.tiles[x][y].setPiece(p);
    }
}

class Tile {
    piece: Piece;
    constructor(p?: Piece) {
        this.piece = p || Nothing;
    }
    toString() {
        return this.piece.toString();
    }
    setPiece(p: Piece) {
        this.piece = p;
    }
    isEmpty() {
        return this.piece.isNothing;
    }
}
