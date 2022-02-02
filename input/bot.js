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

    moveDirection = null;

    constructor(pixiStage, scene, fps, random, name, inputManager){

        this.name = name;
        this.inputManager = inputManager;

        this.input = new InputBot()

        let planetView = new PlanetView(0, 0, 100, 'bot', '0x6699ff', pixiStage);
        this.planet = new Planet(planetView.container, scene, fps, name);

        let inputConverter = new BotToInputManagerSetter(name, inputManager)

        this.stateManager = new StateManager()
        let states =  
        [
            new MovingState(this.stateManager, this.planet, scene, null, random),
            new SearchAndAttackState(this.stateManager, this.planet, scene, null, random)
        ]

        this.stateManager.setStates(states)

    }

    tick(delta) {        
        this.stateManager.tick(delta);
        this.stateManager.logCurrentState()
    }

    getDirection(){
        let vector2 = this.stateManager?.currentState?.currentDirection;

        if (!vector2)
            vector2 = new Vector2()

        let message = new InputInternal(
            this.name,
            (vector2.x < -0.2),
            (vector2.x > 0.2),
            (vector2.y > 0.2),
            (vector2.y < -0.2)
        )
        return message
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

            console.log('[MovingState] border colided, getting random vector: ' + JSON.stringify(this.currentDirection) )
        }

        //this.input.addInput(this.currentDirection)
        this.previousPosition = planetPosition
        this.timer.update(delta)


        console.log('[MovingState] move: ' + JSON.stringify(this.currentDirection) )

        if (this.timer.isFinished()) {

        console.log('[MovingState] time is finished, move to another state: SearchAndAttackState ')
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
    timer = new Timer(200)
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
            //this.input.addInput(JSON.stringify(this.currentDirection))
            this.timer.update(delta)
            console.log('[SearchAndAttackState] has current direction: ' + JSON.stringify(this.currentDirection))
        } else {
            let planetPosition = this.planet.transform.position
            let closestMeteor = this.scene.getClosestMeteor(planetPosition, 400)
            if (closestMeteor) {
                let meteorPosition = closestMeteor.transform.position
                this.currentDirection = meteorPosition.substract(planetPosition).getNormalized()
                console.log('[SearchAndAttackState] found new meteor: ' + JSON.stringify(this.currentDirection))
            } else {

                console.log('[SearchAndAttackState] cannot find meteor, changing state to MovingState')
                this.stateManager.nextState(StatesEnum.MovingState)
            }
        }
        

        if (this.timer.isFinished()) {

            console.log('[SearchAndAttackState] time is finished, changing state to MovingState')
            this.stateManager.nextState(StatesEnum.MovingState)
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
    constructor(){
    }

    setStates(states){
        this.states = states
        this.nextState(StatesEnum.MovingState)
    }   

    logCurrentState() {
        console.log(this.currentState.name)
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