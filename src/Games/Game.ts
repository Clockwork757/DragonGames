export enum EndState {
    Player1 = 'p1',
    Player2 = 'p2',
    Tie = 'tie',
    inProgress = 'prog'
}

export abstract class Game {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract render(): string
    abstract parseMove(j: any): boolean
    abstract get state(): EndState
}

export abstract class BoardGame extends Game {
    board: Board;
    validPieces: Array<Piece>;
    constructor(name: string, n: number, validPieces?: Array<Piece>) {
        super(name);
        this.validPieces = validPieces || new Array<Piece>();
        this.board = new Board(n);
    }

    place(p: Piece, x: number, y: number) {
        if (this.validPieces.includes(p)) {
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

    render() {
        return this.board.toHTML(this.name);
    }
}

export abstract class Piece {
    type: string;
    image: string;
    isNothing: Boolean = false;

    constructor(t: string) {
        this.type = t;
        this.image = `/imgs/${t}.png`;
    }

    toString() {
        return this.type;
    }
}

class _Nothing extends Piece {
    constructor() {
        super("Nothing");
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

    toHTML(game: string) {
        let h = `<table class='board ${game}'>`
        let n: number = this.tiles.length;
        for (let i: number = 0; i < n; i++) {
            h += "<tr>"
            for (let j: number = 0; j < n; j++) {
                var image = `<img data-x=${j} data-y=${i} class="tile-image ${game}-tile-image" src="${this.getTile(j, i).piece.image}">`;
                h += `<td data-x=${j} data-y=${i} class="tile ${game}-tile">${image}</td>`;
            }
            h += "</tr>\n"
        }
        return h + "</table>"
    }

    private row(i: number) {
        var r = new Array<Tile>();
        let n: number = this.tiles.length;
        for (let j: number = 0; j < n; j++) {
            r.push(this.getTile(j, i))
        }
        return r;
    }

    private col(j: number) {
        var c = new Array<Tile>();
        let n: number = this.tiles.length;
        for (let i: number = 0; i < n; i++) {
            c.push(this.getTile(j, i))
        }
        return c;
    }

    private diagLR() {
        var d = new Array<Tile>();
        let n: number = this.tiles.length;
        for (let i: number = 0; i < n; i++) {
            d.push(this.getTile(i, i));
        }
        return d;
    }

    private diagRL() {
        var d = new Array<Tile>();
        let n: number = this.tiles.length;
        for (let i: number = n; i >= 0; i--) {
            d.push(this.getTile(i - 1, 3 - i));
        }
        return d;
    }

    getTile(x: number, y: number) {
        return this.tiles[x][y];
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
    get isEmpty() {
        return this.piece.isNothing;
    }
}
