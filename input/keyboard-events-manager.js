import { InputKeyboard } from "./input-keyboard";


export class KeyboardEventsManager {


    currentInputKeyboard = new InputKeyboard()

    constructor(params) {
                
        let input = this.currentInputKeyboard
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowUp') {
                input.arrowUp = true;
                this.onInputKeyboard(input)
            }

            if (event.code == 'ArrowDown') {
                input.arrowDown = true;
                this.onInputKeyboard(input)
            }

            if (event.code == 'ArrowRight') {
                input.arrowRight = true;
                this.onInputKeyboard(input)
            }

            if (event.code == 'ArrowLeft') {
                input.arrowLeft = true;
                this.onInputKeyboard(input)
            }
        })

        window.addEventListener('keyup', function(event) {
            if (event.code == 'ArrowUp') {
                input.arrowUp = false;
                this.onInputKeyboard(input)
            }

            if (event.code == 'ArrowDown') {
                input.arrowDown = false;
                this.onInputKeyboard(input)
            }

            if (event.code == 'ArrowRight') {
                input.arrowRight = false;     
                this.onInputKeyboard(input) 
            }

            if (event.code == 'ArrowLeft') {
                input.arrowLeft = false;
                this.onInputKeyboard(input)
            }
        })
    }

    onInputKeyboard(input) {
        throw new Error('onInputKeyboard not assigned!')
    }
}