import { BoardGame, Piece, EndState } from "./Game";

export class Chess extends BoardGame {
    constructor() {
        super('Chess', 8);
    }

    parseMove(j: any) {

    }

    checkEnd(){
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