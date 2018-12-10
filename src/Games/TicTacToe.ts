import { BoardGame, Piece, EndState } from './Game';

export class TicTacToe extends BoardGame {
    constructor() {
        super('TicTacToe', 3, [X, O]);
    }

    placeX(x: number, y: number) {
        console.log(`X: ${x},${y}: ${this.getTile(x, y)}, ${this.getTile(x, y).isEmpty}`)
        if (this.getTile(x, y).isEmpty) {
            this.place(X, x, y)
            return true;
        }
        return false;
    }

    placeO(x: number, y: number) {
        console.log(`O: ${x},${y}: ${this.getTile(x, y)}, ${this.getTile(x, y).isEmpty}`)
        if (this.getTile(x, y).isEmpty) {
            this.place(O, x, y)
            return true;
        }
        return false;
    }

    parseMove(j: any) {
        switch (j['piece']) {
            case 'X': return this.placeX(j['x'], j['y']);
            case 'O': return this.placeO(j['x'], j['y']);
        }
        return false;
    }

    render() {
        return this.board.toHTML('TicTacToe');
    }

    get state() {
        var e = EndState.inProgress;

        return e;
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

const X: _X = new _X();
const O: _O = new _O();