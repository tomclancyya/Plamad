import { State } from "pixi.js";
import { Ticker } from "../engine/ticker";
import { InputMessage } from "../models/network/input-message";
import { Planet } from "../models/planet";
import { Scene } from "../models/scene";
import { PlanetView } from "../ui/planet-view";
import { Timer } from "../utils/timer";
import { Vector2 } from "../utils/vector2";
import { Input } from "./input";
import { InputBot } from "./input-bot";
import { InputInternal } from "./input-internal";
import { InputPlayer } from "./input-player";
import { MutableInputManager } from "./mutable-input-manager";

export class Bot {

    /**
     * @type {MutableInputManager}
     */
    inputManager = null

    stateManager = null;

    name;

    constructor(pixiStage, scene, fps, random, name, inputManager){

        this.name = name;
        this.inputManager = inputManager;

        this.input = new InputBot()

        let planetView = new PlanetView(0, 0, 100, 'bot', '0x6699ff', pixiStage);
        this.planet = new Planet(planetView.container, scene, fps, name);

        let inputConverter = new BotToInputManagerSetter(name, inputManager)
        this.stateManager = new StateManager(this.planet, scene, inputConverter, random)


    }

    tick(delta) {        
        this.stateManager.tick(delta);
    }


}

class BotToInputManagerSetter {
    constructor (botName, inputManager) {
        this.botName = botName;
        this.inputManager = inputManager;
    }

    addInput(vector2){
        let message = new InputInternal(
            this.botName,
            (vector2.x < -0.2),
            (vector2.x > 0.2),
            (vector2.y > 0.2),
            (vector2.y < -0.2)
        )
        this.inputManager.addInput(message)
    }
}

class MovingState {

    previousPosition = new Vector2(0, 0)
    name = StatesEnum.MovingState
    currentDirection = new Vector2(1, 1)
    timer = new Timer(2000)
    random = null

    /**
     * 
     * @param {*} planet 
     * @param {*} scene 
     * @param {BotToInputManagerSetter} input 
     * @param {*} random 
     */
    constructor(stateManager, planet, scene, input, random, onNextState) {
        this.planet = planet
        this.scene = scene
        this.input = input
        this.random = random
        this.stateManager = stateManager
    }

    update(delta) {
        let planetPosition = this.planet.transform.position
        if (this.planet.transform.isCollideBorder()) {
            this.currentDirection = this.random.getVector()
        }

        this.input.addInput(this.currentDirection)
        this.previousPosition = planetPosition
        this.timer.update(delta)

        if (this.timer.isFinished()) {
            this.stateManager.nextState(StatesEnum.SearchAndAttackState)
        }
    }

    start(){
        this.timer.reset()
        this.currentDirection = this.random.getVector()
    }

    
        
}

class SearchAndAttackState {


    name = StatesEnum.SearchAndAttackState
    currentDirection = null
    timer = new Timer(5000)
    random = null
    /**
     * @type {Scene}
     */
    scene = null
    /**
     * @type {Planet}
     */
    planet = null

    constructor(stateManager, planet, scene, input, random) {
        this.planet = planet
        this.scene = scene
        this.input = input
        this.random = random
        this.currentDirection = random.getVector()
        this.stateManager = stateManager
    }

    update(delta) {

        if (this.currentDirection) {
            this.input.addInput(this.currentDirection)
            this.timer.update(delta)
        } else {
            let planetPosition = this.planet.transform.position
            let closestMeteor = this.scene.getClosestMeteor(planetPosition, 400)
            if (closestMeteor) {
                let meteorPosition = closestMeteor.transform.position
                this.currentDirection = meteorPosition.substract(planetPosition).getNormalized()
            } else {
                this.stateManager.nextState(StatesEnum.MovingState)
            }
        }
        

        if (this.timer.isFinished()) {
            //this.stateManager.nextState(StatesEnum.MovingState)
        }
    }

    start() {
        this.currentDirection = null
        this.timer.reset()
    }
}

const StatesEnum = {
    MovingState: "MovingState",
    SearchAndAttackState: "SearchAndAttackState"
}

class StateManager {

    states = []
    currentState = null
    constructor(planet, scene, input, random){
        this.states.push(
            new MovingState(this, planet, scene, input, random),
            new SearchAndAttackState(this, planet, scene, input, random)
        )

        this.nextState(StatesEnum.MovingState)
    }

    tick(delta){
        this.currentState.update(delta);
    }

    nextState(stateName){
        // here u can control transition between states
        // for example can set rule, like, do not change the state from jump to sleep
        let nextState = this.states.find(s => s.name == stateName)
        this.currentState = nextState;
        this.currentState.start()


    }


}