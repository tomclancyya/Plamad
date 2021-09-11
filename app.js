const { Input } = require('./models/input.js');



let input = new Input()
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowUp') {
        input.isUp = true;
    }

    if (event.code == 'ArrowDown') {
        input.isDown = true;
    }

    if (event.code == 'ArrowRight') {
        input.isRight = true;
    }

    if (event.code == 'ArrowLeft') {
        input.isLeft = true;
    }
})

window.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowUp') {
        input.isUp = false;
    }

    if (event.code == 'ArrowDown') {
        input.isDown = false;
    }

    if (event.code == 'ArrowRight') {
        input.isRight = false;      
    }

    if (event.code == 'ArrowLeft') {
        input.isLeft = false;
    }
})


let gameView = require('./game.js')(input)
document.getElementById('game').appendChild(gameView);
