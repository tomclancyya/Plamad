import { Container } from 'pixi.js';
import { Button } from '../ui/button-view'
import { GameContext } from './game-context';
import { Transform } from './transform'
import { Scene } from './scene';
import { InputPlayer } from '../input/input-player';
import { Input } from '../input/input';
import { EventManager } from '../utils/event-manager';
import { levels } from './planet-level';

export class Planet {
      /** 
         * @type {Transform}
         * @public
         */
    transform = null

    /** 
     * @type {Container}
     * @public
     */
    view = null;


    /** 
     * @type {Scene}
     * @public
     */
    scene = null;

    input = null;

    name = null;

    score = 0;

    level = 1;

    exp = 0;

    /** 
    * @param {Scene} scene  
    */
    constructor(view, scene, fps, name){
        this.view = view
        this.scene = scene 
        this.transform = new Transform(scene.mapSize);
        this.name = name;

        scene.addPlanet(this)

        this.applyLevelStats()
    }

    moveByVector(delta, input) {
        let speed = levels.find(l => l.level == this.level).speed
        let direction = input.multiValue(delta * speed);
        this.transform.move(direction);     
    }

    render() {
        this.view.container.position.x = this.transform.position.x
        this.view.container.position.y = this.transform.position.y
    }

    onCollideMeteor(meteor){
        //TODO: maybe need to move isCollider to Collide Engine
        if (this.transform.isCollide(meteor.transform)){
            meteor.delete();
            this.score++;
            this.exp++;
        }
    }

    onCollidePlanet(planet){
        // do somethong
    }

    isActive() {
        return this.view != null
    }

    delete() {
        this.view.delete();
        this.view = null;
        this.scene.deletePlanet(this)
    }

    checkForLevelUp(){
        let expForLevelUp = levels.find(l => l.level == this.level).expForLevelUp
        let currentExp = this.exp
        if (expForLevelUp <= currentExp) {
            console.log("level up!")
            this.exp = 0
            this.level = this.level + 1;
            this.applyLevelStats()
        }
    }

    applyLevelStats() {
        let levelStats = levels.find(l => l.level == this.level)
        this.transform.setSize(levelStats.size)
        this.view.setSize(levelStats.size)
    }

    tick() {        
        this.render();   
    }

    networkTick() {
        this.checkForLevelUp()
    }
}