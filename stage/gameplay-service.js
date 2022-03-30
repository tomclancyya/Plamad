import { Application, ObservablePoint } from 'pixi.js';
import { Button } from '../ui/button-view';
import { GameContext } from '../models/game-context';
import { Planet } from '../models/planet';
import { PlanetView } from '../ui/planet-view';
import { CenterCoordinatesView } from '../ui/center-coordinates-view';
import { CollisionEngine } from '../engine/collision-engine';
import { Scene } from '../models/scene';
import { MeteorSpawner } from '../models/meteor-spawner';
import { Bot } from '../input/bot';
import { Ticker, TickerSettings } from '../engine/ticker';
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

        //ui container
        let ui = app.stage.getChildByName("ui")
        let gameplay = app.stage.getChildByName("gameplay")

        let inputManager = context.input
        
        function createTile(x, y){
            new Button(x, y, 100, 100, '', '0x111111', gameplay, () => {});
        }

        let mapSize = context.settings.mapSize
        for (let i = 0; i < mapSize / 100; i++){
            for (let j = 0; j < mapSize / 100; j++){
                createTile(i * 100 + 50, j * 100 + 50)
            }
        }

        let scene = new Scene(context.settings.mapSize);

        let planetView = new PlanetView(0, 0, 100, 'player1', '0x110033', gameplay);
        let planet = new Planet(planetView, scene, context.settings.engineFps, 'player1');

        /**
         * @type {Bot[]}  
         */
        let bots = []
        for (let i = 0; i < context.settings.botsAmount; i++){
            let botName = 'bot' + i
            let position = context.random.getVectorSquare(50, scene.mapSize - 50)
            let planetView = new PlanetView(0, 0, 100, botName, '0x6699ff', gameplay);
            let planet = new Planet(planetView, scene, null, botName);
            planet.moveToPosition(position)
            let bot = new Bot(context, scene, planet, botName)
            bots.push(bot)
        }

        let collision = new CollisionEngine(scene, context.settings.engineFps)
        let meteorSpawner = new MeteorSpawner(context, scene, gameplay)

        new CenterCoordinatesView(0, 0, gameplay)
        new CenterCoordinatesView(100, null, gameplay)
        new CenterCoordinatesView(null, 100, gameplay)

        let inputDriver = new GameInputDriver(context.input, scene)

        let tickers = []

        let scoreView = new TextView(250, 50, "123567", ui)
        let button = new Button(450, 50, 100, 100, "☰", "white", ui, () => {
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


        let engineTickerSetting = new TickerSettings()
        engineTickerSetting.tickPerSeconds = context.settings.engineFps
        engineTickerSetting.tickerTimeLimitSec = context.settings.tickerTimeLimitSec

        tickers.push(new Ticker(engineTickerSetting, (delta) => {
            let pos = planet.transform.position;    
        
            //move camera
            if (context.settings.cameraMode == CameraModeEnum.showPlayer) {
                let zoom = planet.getLevelStat().zoom
                gameplay.pivot.set(pos.x, pos.y);
                gameplay.scale.set(zoom) 
                //ui.scale.set(zoom,zoom) 
            }

            if (context.settings.cameraMode == CameraModeEnum.showMap)
                gameplay.pivot.set(context.settings.mapSize / 2,context.settings.mapSize / 2);

            scoreView.setText(planet.level + "")

            scene.getObjects().map(t => t.tick(delta))
        }))       

        // tick driver (temporary use simple ticker)

        tickers.push(new Ticker(engineTickerSetting, (delta) => {
          
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


        let networkTickerSetting = new TickerSettings()
        networkTickerSetting.tickPerSeconds = 20
        networkTickerSetting.tickerTimeLimitSec = context.settings.tickerTimeLimitSec
        
        // network tick driver
        tickers.push(new Ticker(networkTickerSetting, (delta) => {
            bots.map(b => { 
                b.tick(delta);
                inputManager.addInput(b.getDirection())
            })
            inputDriver.networkTick(delta);
            collision.checkPlanetsWithMeteorsCollision();
            collision.checkPlanetsCollision();
            meteorSpawner.networkUpdate(delta);
            scene.getPlanets().map((planet) => {
                planet.networkTick()
            })
        }))

    }
}