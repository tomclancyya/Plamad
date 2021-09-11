import { Application } from 'pixi.js';
import { Button } from '../ui/button-view';
import { GameContext } from '../models/game-context';
import { Planet } from '../models/planet';
import * as M from '../utils/math';

export class GameplayService {
  
    /** 
    * @param {GameContext} context  
    */
    constructor(context){
        
        
        this.context = context;
        /** 
        * @type {Application}  
        */
        let app = context.app;
        
        function createTile(x, y){
            new Button(x, y, 100, 100, '', '0x111111', app.stage, () => {});
        }

        for (let i = 0; i < 20; i++){
            for (let j = 0; j < 20; j++){
                createTile(i * 100, j * 100)
            }
        }

        let planet = new Planet(new Button(0, 0, 100, 100, 'OOO', '0x2c3e50', app.stage, () => {}).container, context);

        //camera
        app.ticker.add((delta) => {
            let pos = planet.transform.position;
            app.stage.pivot.set(pos.x - (app.renderer.width / 2), pos.y  - (app.renderer.width / 2)); 
        })

    }

    //render(planet){
    //    this.app.stage.addChild(planet)
    //}
}

/*

stage.position.set(renderer.screen.width/2, renderer.screen.height/2);
stage.scale.set(1.33);//scale it whatever you want
stage.pivot.set(myCharacter.x, myCharacter.y); //now character inside stage is mapped to center of screen

*/