import { Vector2 } from "../utils/vector2";

export class Input {

    /** 
     * @type {boolean}
     * @public
     */
    isLeft = false;
    isRight = false;
    isUp = false;
    isDown = false;

    getInputDirection(convertToPixiCoordinate = false){
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
        if (convertToPixiCoordinate)
            return new Phaser.Math.Vector2(normalized.x, -normalized.y)
        else 
            return normalized;

    }


    constructor (){}
}