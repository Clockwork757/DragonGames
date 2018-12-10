import { BoardGame, EndState } from "./Game";

export class Chess extends BoardGame {
    constructor() {
        super('Chess', 3);
    }

    parseMove(j: any) {

    }

    checkEnd(){
        var e = EndState.inProgress;

        return e;
    }
}
