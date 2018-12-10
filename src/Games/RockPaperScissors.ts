import { Game, EndState } from './Game'

class RockPaperScissors extends Game {

    constructor() {
        super('RockPaperScissors');
    }

    render() {
        return ""
    }

    parseMove(j: any) {

    }

    checkEnd() {
        var e = EndState.inProgress;

        return e;
    }
}