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
}