import { Button } from "../ui/button-view";
import { InputKeyboard } from "./input-keyboard";


export class KeyboardEventsManager {


    currentInputKeyboard = new InputKeyboard()
    ui = null

    constructor(ui) {
        this.ui = ui

        this.addListenersForKeyboard()
        this.addListenersForUi()
    }

    addListenersForUi() {

        let width = 300
        let height = 100

        let input = this.currentInputKeyboard
        let ui = this.ui
        new Button(50, 250, height, width, "<", null, ui, () => {
            input.arrowLeft = false
        }, () => {
            input.arrowLeft = true
        })

        new Button(450, 250, height, width, ">", null, ui, () => {
            input.arrowRight = false
        }, () => {
            input.arrowRight = true
        })

        new Button(250, 50, width, height, "^", null, ui, () => {
            input.arrowUp = false
        }, () => {
            input.arrowUp = true
        })

        new Button(250, 450, width, height, "v", null, ui, () => {
            input.arrowDown = false
        }, () => {
            input.arrowDown = true
        })

    }

    addListenersForKeyboard() {
        let input = this.currentInputKeyboard
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowUp') {
                input.arrowUp = true;
            }

            if (event.code == 'ArrowDown') {
                input.arrowDown = true;
            }

            if (event.code == 'ArrowRight') {
                input.arrowRight = true;
            }

            if (event.code == 'ArrowLeft') {
                input.arrowLeft = true;
            }
        })

        window.addEventListener('keyup', function(event) {
            if (event.code == 'ArrowUp') {
                input.arrowUp = false;
            }

            if (event.code == 'ArrowDown') {
                input.arrowDown = false;
            }

            if (event.code == 'ArrowRight') {
                input.arrowRight = false;    
            }

            if (event.code == 'ArrowLeft') {
                input.arrowLeft = false;
            }
        })
    }

    getInput() {
        return this.currentInputKeyboard
    }

    onInputKeyboard(input) {
        throw new Error('onInputKeyboard not assigned!')
    }
}