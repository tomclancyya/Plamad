import { Application } from 'pixi.js';
import { Container } from 'pixi.js';
import { Button } from '../ui/button-view';
import { GameContext } from '../models/game-context';
import { Planet } from '../models/planet';
import { PlanetView } from '../ui/planet-view';
import { CenterCoordinatesView } from '../ui/center-coordinates-view';
import { CollisionEngine } from '../engine/collision-engine';
import { Scene } from '../models/scene';
import { MeteorSpawner } from '../models/meteor-spawner';
import { Bot } from '../input/bot';
import { EventManager } from '../utils/event-manager';
import { Ticker } from '../engine/ticker';
import { GameInputDriver } from '../input/game-input-driver';
import { TextView } from '../ui/text-view';
import { ResultView } from '../ui/result-view';
import { ResultViewSettings, ResultViewType } from '../ui/result-view-settings';
import { CameraModeEnum } from '../models/settings';

export class GameplayService {
  
    /** 
    * @param {GameContext} context  
    */
    constructor(context){

        const StatesEnum = {
            GameState: "GameState",
            MenuState: "MenuState"
        }

        let currentState = StatesEnum.GameState        
        
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
        let planet = new Planet(planetView, scene, context.settings.engineFps, 'player1');

        /**
         * @type {Bot[]}  
         */
        let bots = []
        for (let i = 0; i < 0; i++){
            let botName = 'bot' + i
            let planetView = new PlanetView(0, 0, 100, botName, '0x6699ff', context.app.stage);
            let planet = new Planet(planetView.container, scene, null, botName);
            let bot = new Bot(context, scene, planet, botName)
            bots.push(bot)
        }

        let collision = new CollisionEngine(scene, context.settings.engineFps)
        let meteorSpawner = new MeteorSpawner(context, scene)

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
            let viewSettings = new ResultViewSettings()
            viewSettings.playerScore = planet.score
            viewSettings.resultViewType = ResultViewType.LevelMenu

            new ResultView(ui, viewSettings, () => {
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
            if (context.settings.cameraMode == CameraModeEnum.showPlayer)
                app.stage.pivot.set(pos.x, pos.y);

            if (context.settings.cameraMode == CameraModeEnum.showMap)
                app.stage.pivot.set(context.settings.mapSize / 2,context.settings.mapSize / 2);

            //adjust ui container
            ui.x = pos.x;
            ui.y = pos.y;
            app.stage.setChildIndex(ui, app.stage.children.length - 1)
            scoreView.setText(planet.score + "")

            scene.getObjects().map(t => t.tick(delta))
        }))        


        // tick driver (temporary use simple ticker)
        tickers.push(new Ticker(context.settings.engineFps, (delta) => {
            bots.map(b => { 
                b.tick(delta);
                inputManager.addInput(b.getDirection())
            })

            //check score
            if (currentState == StatesEnum.GameState && meteorSpawner.allMeteorsWasDestroyed()){
                currentState = StatesEnum.MenuState

                // find best player
                let allPlanets = scene.getPlanets()
                let bestPlanet = allPlanets.reduce(function (bestPLanet, currentPlanet) {
                    if (currentPlanet.score > bestPLanet.score)
                        return currentPlanet
                    else
                        return bestPLanet
        
                }, allPlanets[0])

                let viewSettings = new ResultViewSettings()
                viewSettings.playerScore = planet.score
                viewSettings.resultViewType = ResultViewType.ResultMenu
                viewSettings.bestPlayerName = bestPlanet.name
                viewSettings.bestPlayerScore = bestPlanet.score

                new ResultView(ui, viewSettings, () => {
                    tickers.map(t => t.stop())
                    context.loadGameplay()
                }, () => {
                    tickers.map(t => t.stop())
                    context.loadMenu()
                }, () => {
                    currentState = StatesEnum.GameState
                },)
                }
        }))

        // network tick driver
        tickers.push(new Ticker(20, (delta) => {
            inputDriver.networkTick(delta);
            collision.isPlanetCollidesMeteor();
            meteorSpawner.networkUpdate(delta);
            scene.getPlanets().map((planet) => {
                planet.networkTick()
            })
        }))

    }
}

/*

stage.position.set(renderer.screen.width/2, renderer.screen.height/2);
stage.scale.set(1.33);//scale it whatever you want
stage.pivot.set(myCharacter.x, myCharacter.y); //now character inside stage is mapped to center of screen

*/