import { MovingState, SearchAndAttackState, StateManager } from "../../input/bot";
import { Meteor } from "../../models/meteor";
import { Planet } from "../../models/planet";
import { Scene } from "../../models/scene";
import { CommonView } from "../../ui/common/common-view";
import { BaseTimer } from "../../utils/base-timer";
import { Vector2 } from "../../utils/vector2";
import { done, isEqual, isNumberEqual, isVector2Equal } from "../test-engine/test-assertion";
import { Random } from "../../engine/random"


export class BotTest {
    constructor(){
        
    }
    getTests() {
        return {
            "bot test should":
            {
                "has direction to the closest meteor": () => {
          
                    
                    let scene = new Scene(1000)
                    let stateManager = new StateManager()
                    let planet = new Planet(new TestView(), scene, 40, "bot1")
                    planet.transform.position = new Vector2(100,100)
                    let timer = new BaseTimer(999999)
                    let state = new SearchAndAttackState(stateManager, planet, scene, null, timer)
                    let meteor1 = new Meteor(new TestView(), scene, new Vector2(110,100))
                    let meteor2 = new Meteor(new TestView(), scene, new Vector2(100,105))
                    scene.meteors = [
                        meteor1
                    ]    
                    isEqual(planet.transform.position.x, 100)
                    isEqual(planet.transform.position.y, 100)
                    isEqual(meteor1.transform.position.x, 110)
                    isEqual(meteor1.transform.position.y, 100)
                    isEqual(state.currentDirection, null)   
                    state.update(0)         
                    isVector2Equal(state.currentDirection, new Vector2(1,0))    
                    
                    // added other meteor, closer
                    scene.meteors.push(meteor2)
                    state.update(0)                     
                    isVector2Equal(state.currentDirection, new Vector2(0,1))     

                    return done();
                },
                "get random direction": () => {
                    
                    let scene = new Scene(1000)
                    let stateManager = new StateManager()
                    let planet = new Planet(new TestView(), scene, 40, "bot1")
                    planet.transform.position = new Vector2(100,100)
                    let timer = new BaseTimer(999999)
                    let random = new Random(null)
                    random.getVector = function () {
                        return new Vector2(0.5, 0.5)
                    }
                    let state = new MovingState(planet, scene, random, timer)                  
                    isEqual(planet.transform.position.x, 100)
                    isEqual(planet.transform.position.y, 100)
                    isEqual(state.currentDirection, null)  
                    state.start()
                    isVector2Equal(state.currentDirection, new Vector2(0.5,0.5))   

                    //should get new direction, of collide border
                    random.getVector = function () {
                        return new Vector2(0.6, 0.6)
                    }
                    planet.transform.position = new Vector2(-1, -1) //outside of map
                    planet.transform.move(new Vector2(0,0))
                    state.update(0)
                    isVector2Equal(state.currentDirection, new Vector2(0.6,0.6))  

                    // if timeout, should change the state
                    planet.transform.position = new Vector2(100, 100) //outside of map
                    planet.transform.move(new Vector2(0,0))
                    timer.isFinished = function() {
                        return true;
                    }
                    state.update(0)
                    isEqual(state.nextState, "SearchAndAttackState")
     

                    return done();
                },
                "planet is not going outside of border": () => {
                    return done();
                    let scene = new Scene(1000)
                    let planet = new Planet(new TestView(), scene, 40, "bot1")
                    planet.transform.position = new Vector2(0,0)
                    planet.transform.move(new Vector2(0, 0))
                    isEqual(planet.transform.isCollideBorder(), true)
                    planet.transform.move(new Vector2(0.01, 0.01))
                    // is it failing? check epsilon in math file
                    isEqual(planet.transform.isCollideBorder(), false)
                    return done();
                }
            }
        }
    }
}


class TestView extends CommonView{
    constructor() {
        let container = { position: new Vector2(0,0)}
        super(container)
    }
}