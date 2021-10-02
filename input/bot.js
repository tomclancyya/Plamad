import { Ticker } from "../engine/ticker";
import { InputMessage } from "../models/network/input-message";
import { Planet } from "../models/planet";
import { PlanetView } from "../ui/planet-view";
import { Timer } from "../utils/timer";
import { Vector2 } from "../utils/vector2";
import { Input } from "./input";
import { InputBot } from "./input-bot";
import { InputPlayer } from "./input-player";

export class Bot {

    /**
     * @type {Input}
     */
    //input = new InputBot()


    currentState = null;

    name;

    constructor(pixiStage, scene, fps, random, ticker, name, network){

        this.name = name;
        this.network = network;

        this.input = new InputBot()

        let planetView = new PlanetView(0, 0, 100, 'bot', '0x6699ff', pixiStage);
        this.planet = new Planet(planetView.container, this.input, scene, fps, ticker);

        this.currentState = new MovingState(this.planet, scene, this.input, random)
        this.ticker = ticker;

        network.subscribeForInputMessage(this._receiveInput)
        this.tick();

        //ticker.subscribe((delta) => {this.tick(delta)})

    }

    tick = () => {
        let playerInput = this.input
        let message = new InputMessage()
        message.isLeft = (playerInput.input.x < 0)
        message.isRight = (playerInput.input.x > 0)
        message.isUp = (playerInput.input.y > 0)
        message.isDown = (playerInput.input.y < 0)
        message.playerName = this.name
        this.network.sendInputMessage(message)
    }

    _receiveInput = (delta, input) => {
        if (input.playerName == this.name) {
            let inputPlayer = new InputPlayer()
            inputPlayer.isLeft = input.isLeft
            inputPlayer.isRight = input.isRight
            inputPlayer.isUp = input.isUp
            inputPlayer.isDown = input.isDown
            this.planet.updateInput(delta, inputPlayer)

            this.currentState.update(delta);
            this.tick();
        }
    }

   // tick = (delta) => {
   //     this.currentState.update(delta);
   // }

    //TODO: unsubscribe tick


}

class MovingState {
    
    currentDirection = new Vector2(1, 1)
    timer = new Timer(500)
    random

    constructor(planet, scene, input, random) {
        this.planet = planet
        this.scene = scene
        this.input = input
        this.random = random
        this.currentDirection = random.getVector()
    }

    update(delta) {
        this.input.setInputDirection(this.currentDirection)
        this.timer.update(delta)

        if (this.timer.isFinished()) {
            this.timer.reset()
            this.currentDirection = this.random.getVector().getNormalized()
        }
    }
        
}

class SearchAndAttackState {

    currentDirection = new Vector2(1, 1)
    timer = new Timer(1500)
    random

    constructor(planet, scene, input, random) {
        this.planet = planet
        this.scene = scene
        this.input = input
        this.random = random
        this.currentDirection = random.getVector()
    }

    update(delta) {
        this.input.setInputDirection(this.currentDirection)
        this.timer.update(delta)

        if (this.timer.isFinished()) {
            this.timer.reset()
            this.currentDirection = this.random.getVector().getNormalized()
        }
    }
}