const { InputKeyboard } = require('./input/input-keyboard.js');


let input = new InputKeyboard()
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


let gameView = require('./game.js')(input)
document.getElementById('game').appendChild(gameView);
let canvas = document.getElementsByTagName('canvas')[0]

let bodyHeight = window.innerHeight;
let bodyWidth = document.body.clientWidth
if (bodyHeight < bodyWidth)
    canvas.style.height = bodyHeight + 'px'
else 
    canvas.style.width = bodyWidth + 'px'


