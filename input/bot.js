import { Ticker } from "../engine/ticker";
import { Planet } from "../models/planet";
import { PlanetView } from "../ui/planet-view";
import { Timer } from "../utils/timer";
import { Vector2 } from "../utils/vector2";
import { Input } from "./input";
import { InputBot } from "./input-bot";

export class Bot {

    /**
     * @type {Input}
     */
    //input = new InputBot()

    constructor(pixiStage, scene, fps, random){

        let input = new InputBot()

        let planetView = new PlanetView(0, 0, 100, 'bot', '0x6699ff', pixiStage);
        let planet = new Planet(planetView.container, input, scene, fps);

        let move = new MovingState(planet, scene, input, random)
 
        new Ticker(fps, (delta) => {
            move.update(delta);
        })

    }


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