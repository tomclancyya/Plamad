import { Vector2 } from "../utils/vector2";
import { Input } from "./input";

export class InputBot extends Input {

    constructor(){ super() }

    input = new Vector2(0,0);

    setInputDirection(input){
        this.input = input

    }

    getInputDirection(){
        return this.input
    }
}