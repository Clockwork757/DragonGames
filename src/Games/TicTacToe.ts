import { BoardGame, Piece, Nothing} from './Game';

export class TicTacToe extends BoardGame {
    constructor() {
        super(3, [X, O]);
    }

    placeX(x: number, y: number){
        this.place(X, x,y)
    }

    placeO(x: number, y: number){
        this.place(O, x,y)
    }
}

class _X extends Piece {
    constructor() {
        super("X");
    }
}



class _O extends Piece {
    constructor() {
        super("O");
    }
}

const X:_X = new _X();
const O:_O = new _O();