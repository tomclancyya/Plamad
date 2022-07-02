import { Vector2 } from "../utils/vector2";

export class InputInternal {

    /** 
     * @type {boolean}
     * @public
     */
    isLeft = false;
    isRight = false;
    isUp = false;
    isDown = false;

    inputId = ""

    constructor (inputId, isLeft, isRight, isUp, isDown) {
        this.inputId = inputId
        this.isLeft = isLeft
        this.isRight = isRight
        this.isUp = isUp
        this.isDown = isDown
    }


    /**
     * 
     * @param {InputInternal} input 
     * @returns 
     */
     getVector(){
        let input = this
        let vectorMovement = new Vector2()

        if (input.isUp){
            vectorMovement.y = 1
        }

        if (input.isDown){
            vectorMovement.y = -1
        }

        if (input.isRight){
            vectorMovement.x = 1
        }
        
        if (input.isLeft){
            vectorMovement.x = -1
        }        

        let normalized = vectorMovement.getNormalized();
        return normalized.flipY();
    }
}