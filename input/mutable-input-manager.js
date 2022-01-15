import { InputInternal } from "./input-internal";
import { InputKeyboard } from "./input-keyboard";

export class MutableInputManager { 

    /** 
    * @param {InputKeyboard} inputKeyboard  
    */
    constructor (inputKeyboard) {
        this.inputKeyboard = inputKeyboard
    }

     /** 
     * @type {InputInternal[]}
     * @private
     */
    inputs = []

    /** 
     * @type {InputKeyboard}
     * @private
     */
    inputKeyboard = null

    /** 
    * @param {InputInternal} input  
    */
    addInput(input) {
        let newInputs = this.inputs.filter(i => i.inputId != input.inputId)
        newInputs.push(input)
        this.inputs = newInputs
    }

    getInputs(){
        return this.inputs;
    }

    addInputPlayer(inputKeyboard) {
        let player1Id = "player1"

        let input = new InputInternal(
            player1Id, 
            inputKeyboard.arrowLeft,
            inputKeyboard.arrowRight,
            inputKeyboard.arrowUp,
            inputKeyboard.arrowDown
        )
        this.addInput(input)
    }

    getInput(inputId){
        return this.inputs.filter(i => i.inputId == inputId)
    }
}