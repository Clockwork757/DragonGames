import { BoardGame, Piece, EndState } from "./Game";

export class Chess extends BoardGame {
    constructor() {
        super('Chess', 8);
        this.setTile(new Rook(chessColor.black), 0, 0);
        this.setTile(new Rook(chessColor.black), 7, 0);
        this.setTile(new Knight(chessColor.black), 1, 0);
        this.setTile(new Knight(chessColor.black), 6, 0);
        this.setTile(new Bishop(chessColor.black), 2, 0);
        this.setTile(new Bishop(chessColor.black), 5, 0);
        this.setTile(new Queen(chessColor.black), 3, 0);
        this.setTile(new King(chessColor.black), 4, 0);

        this.setTile(new Rook(chessColor.white), 0, 7);
        this.setTile(new Rook(chessColor.white), 7, 7);
        this.setTile(new Knight(chessColor.white), 1, 7);
        this.setTile(new Knight(chessColor.white), 6, 7);
        this.setTile(new Bishop(chessColor.white), 2, 7);
        this.setTile(new Bishop(chessColor.white), 5, 7);
        this.setTile(new Queen(chessColor.white), 3, 7);
        this.setTile(new King(chessColor.white), 4, 7);

        for (var i = 0; i < 8; i++) {
            this.setTile(new Pawn(chessColor.black), i, 1);
            this.setTile(new Pawn(chessColor.white), i, 6);
        }
    }

    parseMove(j: any) {

    }

    checkEnd() {
        var e = EndState.inProgress;

        return e;
    }
}

enum chessColor {
    black = 'black',
    white = 'white'
}

export class Knight extends Piece {
    constructor(color: chessColor) {
        super("knight_" + color)
    }
}

export class Bishop extends Piece {
    constructor(color: chessColor) {
        super("bishop_" + color)
    }
}

export class Pawn extends Piece {
    constructor(color: chessColor) {
        super("pawn_" + color)
    }
}

export class Queen extends Piece {
    constructor(color: chessColor) {
        super("queen_" + color)
    }
}

export class King extends Piece {
    constructor(color: chessColor) {
        super("king_" + color)
    }
}

export class Rook extends Piece {
    constructor(color: chessColor) {
        super("rook_" + color)
    }
}