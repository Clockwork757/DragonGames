import { BoardGame, Piece, EndState, Nothing, Tile } from './Game';

export class TicTacToe extends BoardGame {
    constructor() {
        super('TicTacToe', 3, [X, O]);
    }

    placeX(x: number, y: number) {
        if (this.getTile(x, y).isEmpty) {
            this.place(X, x, y)
            return true;
        }
        return false;
    }

    placeO(x: number, y: number) {
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
        let wtile: Tile = new Tile(Nothing);
        var victory = false;
        var allIterations = this.board.allIterations(),
            n = allIterations.length;
        for (var i = 0; i < n; i++) {
            var trio = allIterations[i];
            if (trio.every((tile) => {
                return tile.piece.type == 'X'
            })) {
                wtile = trio[0];
                victory = true;
                e = EndState.Player1
                break;
            }
            if (trio.every((tile) => {
                return tile.piece.type == 'O'
            })) {
                wtile = trio[0];
                victory = true;
                e = EndState.Player2
                break;
            }
            if (victory) {
                console.log("Someone won");
                console.log(e);
                if (wtile.piece.type == 'X') {
                    console.log('X won');
                } else {
                    console.log('O won');
                }
                break;
            }
            if (this.board.full) {
                e = EndState.Tie;
            }
        }
        return e;
    };
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