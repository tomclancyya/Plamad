import { Container } from 'pixi.js';
import { Button } from '../ui/button-view'
import { Ticker } from '../engine/ticker';
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

    /** 
     * @type {EventManager}
     * @public
     */
     ticker = null;

    /** 
    * @param {Input} input  
    * @param {Scene} scene  
    * @param {EventManager} ticker
    */
    constructor(view, input, scene, fps, ticker){
        this.ticker = ticker;
        this.input = input;
        this.view = view
        this.scene = scene 
        this.transform = new Transform(scene.mapSize);

        // вообще странный способ, тип подписываюсь на функцию которая вызывает тик.
        // это все потому что без такого замыкания подписанная функция потеряет весь контекст почему то
        // как теперь отписаться????
       // ticker.subscribe(this.tick)

        scene.addPlanet(this)
    }

    //interface for ticker
    tick = (delta) => {
        let direction = this.input.getInputDirection().flipY().multiValue(delta / 1);
        this.transform.move(direction);
        this.render();
    }

    updateInput(delta, input) {
        let direction = input.getInputDirection().flipY().multiValue(delta / 1);
        this.transform.move(direction);
        this.render();
    }

    render() {
        this.view.position.x = this.transform.position.x
        this.view.position.y = this.transform.position.y
    }

    onCollideMeteor(meteor){
        //TODO: maybe need to move isCollider to Collide Engine
        if (this.transform.isCollide(meteor.transform)){
            meteor.delete()
        }
    }

    onCollidePlanet(planet){
        // do somethong
    }

    isActive() {
        return this.view != null
    }

    delete() {
        this.ticker.unsubscribe(this.tick)
        this.view.delete();
        this.view = null;
        this.scene.deletePlanet(this)
    }
}