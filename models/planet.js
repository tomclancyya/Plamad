import { Container } from 'pixi.js';
import { Button } from '../ui/button-view'
import { GameContext } from './game-context';
import { Transform } from './transform'
import { Scene } from './scene';
import { InputPlayer } from '../input/input-player';
import { Input } from '../input/input';
import { EventManager } from '../utils/event-manager';

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

    /** 
    * @param {Scene} scene  
    */
    constructor(view, scene, fps, name){
        this.view = view
        this.scene = scene 
        this.transform = new Transform(scene.mapSize);
        this.name = name;

        scene.addPlanet(this)
    }

    moveByVector(delta, input) {
        //console.log(delta)
        let direction = input.multiValue(delta / 1);
        this.transform.move(direction);     
    }

    render() {
        this.view.position.x = this.transform.position.x
        this.view.position.y = this.transform.position.y
    }

    onCollideMeteor(meteor){
        //TODO: maybe need to move isCollider to Collide Engine
        if (this.transform.isCollide(meteor.transform)){
            meteor.delete();
            this.score++;
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

    tick() {        
        this.render();   
    }
}