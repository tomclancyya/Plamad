import { Container } from 'pixi.js';
import { Button } from '../ui/button-view'
import { Ticker } from '../engine/ticker';
import { GameContext } from './game-context';
import { Transform } from './transform'
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
    * @param {GameContext} context  
    */
    constructor(view, context){
        this.view = view
        this.transform = new Transform(context.settings.mapSize);

        new Ticker(context.settings.engineFps, (delta) => {
            let direction = context.input.getInputDirection().flipY().multiValue(delta / 1);
            this.transform.move(direction);
            this.render();
        })

        context.app.ticker.add((delta) => {
            //console.log(delta);
           // тут можно интерполяцию замутить
          //  this.render();
        })


    }

    render() {
        this.view.position.x = this.transform.position.x
        this.view.position.y = this.transform.position.y
       // console.log(this.view.position)
    }
}