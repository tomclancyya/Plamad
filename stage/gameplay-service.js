import { Application } from 'pixi.js';
import { Button } from '../ui/button-view';
import { GameContext } from '../models/game-context';
import { Planet } from '../models/planet';
import * as M from '../utils/math';
import { PlanetView } from '../ui/planet-view';
import { MeteorView } from '../ui/meteor-view';
import { Meteor } from '../models/meteor';
import { CenterCoordinatesView } from '../ui/center-coordinates-view';
import { CollisionEngine } from '../engine/collision-engine';
import { Scene } from '../models/scene';
import { MeteorSpawner } from '../models/meteor-spawner';
import { Bot } from '../input/bot';
import { EventManager } from '../utils/event-manager';
import { Ticker } from '../engine/ticker';
import { Network } from '../engine/network';
import { InputPlayer } from '../input/input-player';
import { InputMessage } from '../models/network/input-message';

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

        let eventTick = new EventManager()

        let scene = new Scene(context.settings.mapSize);

        let planetView = new PlanetView(0, 0, 100, 'player', '0x6699ff', app.stage);
        let planet = new Planet(planetView.container, context.input, scene, context.settings.engineFps, eventTick);

        let network = new Network()

        for (let i = 0; i < 10; i++){
           new Bot(app.stage, scene, context.settings.engineFps, context.random, eventTick, 'bot' + i, network)
        }

        let collision = new CollisionEngine(scene, context.settings.engineFps)
        let meteorSpawner = new MeteorSpawner(context.random, scene, app.stage, 100, 5)

        new CenterCoordinatesView(0, 0, app.stage)
        new CenterCoordinatesView(100, null, app.stage)
        new CenterCoordinatesView(null, 100, app.stage)


        //new Ticker(context.settings.engineFps, (delta) => {
            //eventTick.call(delta)
        //})
        

        this.tick = () => {
            let playerInput = context.input
            let message = new InputMessage()
            message.isLeft = playerInput.isLeft
            message.isRight = playerInput.isRight
            message.isUp = playerInput.isUp
            message.isDown = playerInput.isDown
            message.playerName = 'player'
            network.sendInputMessage(message)
        }

        this.tick()

        network.subscribeForInputMessage((delta, input) => {
            if (input.playerName == 'player') {
                let inputPlayer = new InputPlayer()
                inputPlayer.isLeft = input.isLeft
                inputPlayer.isRight = input.isRight
                inputPlayer.isUp = input.isUp
                inputPlayer.isDown = input.isDown
                planet.updateInput(delta, inputPlayer)
                this.tick()
            }
        })
        

        //camera
        app.ticker.add((delta) => {
            let pos = planet.transform.position;            

            //(0,0) for us is center of the screen
            app.stage.position.x = app.renderer.width/2;
            app.stage.position.y = app.renderer.height/2;
            //scale it

            app.stage.scale.set(0.5) 
            app.stage.pivot.set(pos.x, pos.y);

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