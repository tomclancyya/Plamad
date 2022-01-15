import { Application } from 'pixi.js';
import { Container } from 'pixi.js';
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
import { InputPlayer } from '../input/input-player';
import { InputMessage } from '../models/network/input-message';
import { GameInputDriver } from '../input/game-input-driver';
import { MutableInputManager } from '../input/mutable-input-manager';
import { TextView } from '../ui/text-view';
import { ResultView } from '../ui/result-view';

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

        let inputManager = context.input
        
        function createTile(x, y){
            new Button(x, y, 100, 100, '', '0x111111', app.stage, () => {});
        }

        for (let i = 0; i < 20; i++){
            for (let j = 0; j < 20; j++){
                createTile(i * 100 + 50, j * 100 + 50)
            }
        }

        let eventTick = new EventManager()

        let scene = new Scene(context.settings.mapSize);

        let planetView = new PlanetView(0, 0, 100, 'player1', '0x6699ff', app.stage);
        let planet = new Planet(planetView.container, scene, context.settings.engineFps, 'player1');

        /**
         * @type {Bot[]}  
         */
        let bots = []
        for (let i = 0; i < 10; i++){
            bots.push(new Bot(app.stage, scene, context.settings.engineFps, context.random, 'bot' + i, inputManager))
        }

        let collision = new CollisionEngine(scene, context.settings.engineFps)
        let meteorSpawner = new MeteorSpawner(context.random, scene, app.stage, 100, 5)

        new CenterCoordinatesView(0, 0, app.stage)
        new CenterCoordinatesView(100, null, app.stage)
        new CenterCoordinatesView(null, 100, app.stage)

        let inputDriver = new GameInputDriver(context.input, scene)

        let tickers = []

        //ui container
        let ui = new Container();
        app.stage.addChild(ui);
        let scoreView = new TextView(0, -450, "123567", ui)
        let button = new Button(450, -450, 100, 100, "☰", "white", ui, () => {
            new ResultView(ui, planet.score, () => {
                tickers.map(t => t.stop())
                context.loadGameplay()
            }, () => {
                tickers.map(t => t.stop())
                context.loadMenu()
            },)
        })

        //camera


        //app.ticker.add((delta) => {
        // ui ticker
        tickers.push(new Ticker(100, (delta) => {
            let pos = planet.transform.position;            

        
            //move camera
            app.stage.pivot.set(pos.x, pos.y);

            //adjust ui container
            ui.x = pos.x;
            ui.y = pos.y;
            app.stage.setChildIndex(ui, app.stage.children.length - 1)
            scoreView.setText(planet.score + "")

            scene.getObjects().map(t => t.tick(delta))
        }))        


        // tick driver (temporary use simple ticker)
        tickers.push(new Ticker(context.settings.engineFps, (delta) => {
            bots.map(b => b.tick(delta))
        }))

        // network tick driver
        tickers.push(new Ticker(20, (delta) => {
            inputDriver.networkTick(delta);
            collision.isPlanetCollidesMeteor();
            meteorSpawner.networkUpdate(delta);
        }))

    }
}

/*

stage.position.set(renderer.screen.width/2, renderer.screen.height/2);
stage.scale.set(1.33);//scale it whatever you want
stage.pivot.set(myCharacter.x, myCharacter.y); //now character inside stage is mapped to center of screen

*/