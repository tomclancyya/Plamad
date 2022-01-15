import { Planet } from "../models/planet";
import { Scene } from "../models/scene";
import { Vector2 } from "../utils/vector2";
import { InputInternal } from "./input-internal";
import { MutableInputManager } from "./mutable-input-manager";


export class GameInputDriver {

    /**
     * 
     * @param {MutableInputManager} inputManager 
     * @param {Scene} scene
     */
    constructor(inputManager, scene){
        this.inputManager = inputManager
        this.scene = scene;
    }

    networkTick(delta){
        let inputs = this.inputManager.getInputs()

        // TODO:
        //if (input.isNetwork)  
        //sendViaNetwork
        //else
        inputs.map(i => this.setPlanetInput(i, delta))        
    }

    //private
    setPlanetInput(input, delta){
        /**
         * @type {Planet}
         */
        let planet = this.scene.getPlanets().find(p => p.name == input.inputId)
        if (planet)
            planet.moveByVector(delta, this.inputToVector(input))
    }


    /**
     * 
     * @param {InputInternal} input 
     * @returns 
     */
    inputToVector(input){
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