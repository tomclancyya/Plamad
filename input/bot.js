
import Prando from "prando";
import { Random } from "../engine/random";
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
    constructor(context, scene, planet, name, isDetermenistic = true){

        this.name = name
        let random = isDetermenistic ? context.random : new Random(new Prando (2))

        this.stateManager = new StateManager()
        let searchTimer = new Timer(200)
        let moveTimer = new Timer(2000)
        let states =  
        [
            new MovingState(name, scene, random, moveTimer),
            new SearchAndAttackState(name, scene, random, searchTimer)
        ]

        this.stateManager.setStates(states)
    }

    start() {
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
     * @param {string} planetName 
     * @param {Scene} scene 
     * @param {*} random 
     */
    constructor(planetName, scene, random, timer) {
        this.planetName = planetName
        this.scene = scene
        this.random = random
        this.timer = timer
    }

    update(delta) {
        this.scene.getPlanetsByName(this.planetName).map(planet => { 
            if (planet.transform.isCollideBorder()) {
                this.currentDirection = this.random.getVector()
            }

            this.timer.update(delta)

            if (this.timer.isFinished()) {
                this.nextState = StatesEnum.SearchAndAttackState
            }            
        })
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
     * @type {string}
     */
     planetName = null

    constructor(planetName, scene, random, timer) {
        this.timer = timer
        this.planetName = planetName
        this.scene = scene
        this.random = random
    }

    update(delta) {

        this.scene.getPlanetsByName(this.planetName).map(planet => {
                let planetPosition = planet.transform.position
                let closestMeteor = this.scene.getClosestMeteor(planetPosition, 40000)
                if (closestMeteor) {
                    let meteorPosition = closestMeteor.transform.position
                    this.currentDirection = meteorPosition.substract(planetPosition).getNormalized()
                } else {
                    this.nextState = StatesEnum.MovingState
                }           

                if (this.timer.isFinished()) {

                }
            })
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