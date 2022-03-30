
import { GameContext } from "../models/game-context";
import { Planet } from "../models/planet";
import { Scene } from "../models/scene";
import { PlanetView } from "../ui/planet-view";
import { Timer } from "../utils/timer";
import { Vector2 } from "../utils/vector2";
import { InputInternal } from "./input-internal";

export class Bot {


    stateManager = null;

    moveDirection = null;

    /**
     * 
     * @param {GameContext} context  
     * @param {Planet} context  
     * @param {Scene} scene 
     * @param {string} name
     */
    constructor(context, scene, planet, name){

        this.name = name
        let random = context.random

        this.stateManager = new StateManager()
        let searchTimer = new Timer(200)
        let moveTimer = new Timer(2000)
        let states =  
        [
            new MovingState(planet, scene, random, moveTimer),
            new SearchAndAttackState(planet, scene, random, searchTimer)
        ]

        this.stateManager.setStates(states)
        this.stateManager.nextState(StatesEnum.MovingState)

    }

    tick(delta) {        
        this.stateManager.tick(delta);
        //this.stateManager.logCurrentState()
    }

    getDirection(){
        let vector2 = null
        if (this.stateManager && this.stateManager.currentState && this.stateManager.currentState.currentDirection) {
            vector2 = this.stateManager.currentState.currentDirection
        }
       
        if (!vector2)
            vector2 = new Vector2()

        let message = new InputInternal(
            this.name,
            (vector2.x < -0.2),
            (vector2.x > 0.2),
            (vector2.y < -0.2),
            (vector2.y > 0.2)
        )
        return message
    }
}

export class MovingState {
    name = StatesEnum.MovingState
    currentDirection = null
    random = null
    nextState = null

    /**
     * 
     * @param {Planet} planet 
     * @param {*} scene 
     * @param {*} random 
     */
    constructor(planet, scene, random, timer) {
        this.planet = planet
        this.scene = scene
        this.random = random
        this.timer = timer
    }

    update(delta) {
        if (this.planet.transform.isCollideBorder()) {
            this.currentDirection = this.random.getVector()
        }
        this.timer.update(delta)

        if (this.timer.isFinished()) {
            this.nextState = StatesEnum.SearchAndAttackState
        }
    }

    start(){
        this.timer.reset()
        this.currentDirection = this.random.getVector()
        this.nextState = null
    }

    
        
}

export class SearchAndAttackState {


    name = StatesEnum.SearchAndAttackState
    nextState = null
    currentDirection = null
    random = null
    /**
     * @type {Scene}
     */
    scene = null
    /**
     * @type {Planet}
     */
    planet = null

    constructor(planet, scene, random, timer) {
        this.timer = timer
        this.planet = planet
        this.scene = scene
        this.random = random
    }

    update(delta) {

        //if (this.currentDirection) {
        //    this.timer.update(delta)
        //    console.log('[SearchAndAttackState] has current direction: ' + JSON.stringify(this.currentDirection))
        //} else {
            let planetPosition = this.planet.transform.position
            let closestMeteor = this.scene.getClosestMeteor(planetPosition, 40000)
            if (closestMeteor) {
                let meteorPosition = closestMeteor.transform.position
                this.currentDirection = meteorPosition.substract(planetPosition).getNormalized()
            } else {
                this.nextState = StatesEnum.MovingState
            }
        //}
        

        if (this.timer.isFinished()) {

            //console.log('[SearchAndAttackState] time is finished, changing state to MovingState')
            //this.stateManager.nextState(StatesEnum.MovingState)
        }
    }

    start() {
        this.currentDirection = null        
        this.nextState = null
        this.timer.reset()
    }
}

const StatesEnum = {
    MovingState: "MovingState",
    SearchAndAttackState: "SearchAndAttackState"
}

export class StateManager {

    states = []
    currentState = null
    constructor(){
    }

    setStates(states){
        this.states = states
    }   

    logCurrentState() {
        console.log(this.currentState.name)
    }

    tick(delta){
        if (this.currentState.nextState)
        {
            this.nextState(this.currentState.nextState)
        }
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