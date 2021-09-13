import { Vector2 } from "../utils/vector2";
import { Input } from "./input";

export class InputPlayer extends Input {

    /** 
     * @type {boolean}
     * @public
     */
    isLeft = false;
    isRight = false;
    isUp = false;
    isDown = false;

    getInputDirection(){
        let vectorMovement = new Vector2()

        if (this.isUp){
            vectorMovement.y = 1
        }

        if (this.isDown){
            vectorMovement.y = -1
        }

        if (this.isRight){
            vectorMovement.x = 1
        }
        
        if (this.isLeft){
            vectorMovement.x = -1
        }
        

        let normalized = vectorMovement.getNormalized();
        return normalized;
    }


    constructor (){
        super()
    }
}