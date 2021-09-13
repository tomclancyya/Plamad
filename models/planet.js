import { Container } from 'pixi.js';
import { Button } from '../ui/button-view'
import { Ticker } from '../engine/ticker';
import { GameContext } from './game-context';
import { Transform } from './transform'
import { Scene } from './scene';
import { InputPlayer } from '../input/input-player';
import { Input } from '../input/input';
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
    * @param {Input} input  
    * @param {Scene} scene  
    */
    constructor(view, input, scene, fps){
        this.view = view
        this.scene = scene 
        this.transform = new Transform(scene.mapSize);

        new Ticker(fps, (delta) => {
            let direction = input.getInputDirection().flipY().multiValue(delta / 1);
            this.transform.move(direction);
            this.render();
        })

        //context.app.ticker.add((delta) => {
           // тут можно интерполяцию замутить
          //  this.render();
        //})

        scene.addPlanet(this)
    }

    render() {
        this.view.position.x = this.transform.position.x
        this.view.position.y = this.transform.position.y
    }

    onCollideMeteor(meteor){
        if (this.transform.isCollide(meteor.transform)){
            meteor.delete()
        }
    }

    onCollidePlanet(planet){

    }

    delete() {
        this.view.delete();
        this.view = null;
        this.scene.deletePlanet(this)
    }
}