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
     * returns random vector(x,y) where x bettween (-1, 1) and y between (-1, 1)
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