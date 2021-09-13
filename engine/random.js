import Prando from "Prando";
import { Vector2 } from "../utils/vector2";

export class Random {

    /**
     * @type {Prando}
     */
    randomizerEngine;

    /**
     * 
     * @param {Prando} randomizerEngine 
     */
    constructor(randomizerEngine){
        this.randomizerEngine = randomizerEngine
    }

    /**
     * 
     * @param {number} min include
     * @param {number} max include
     */
    getVectorSquare(min, max) {
        let xRandom = this.randomizerEngine.next(min, max)
        let yRandom = this.randomizerEngine.next(min, max)
        return new Vector2(xRandom, yRandom)
    }

    getVector(){
        return this.getVectorSquare(-1, 1)
    }
}