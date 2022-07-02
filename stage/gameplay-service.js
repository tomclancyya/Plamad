import { Application, ObservablePoint } from "pixi.js";
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
import { TextView } from '../ui/text-view';
import { ResultView } from '../ui/result-view';
import { ResultViewSettings, ResultViewType } from '../ui/result-view-settings';
import { CameraModeEnum } from '../models/settings';
import { InfoView } from '../ui/info-view';
import { NetworkService } from '../engine/network-service';
import { GameEvent, GameEventEnum, GameEventManager } from '../input/game-events-manager';
import { StarView } from '../ui/star-view';
import { InputInternal } from "../input/input-internal";
import { Player } from "../models/player";
import { KeyboardEventsManager } from "../input/keyboard-events-manager";

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

        let scene = new Scene(context.settings.mapSize); 

        //ui container
        let ui = app.stage.getChildByName("ui")
        let gameplay = app.stage.getChildByName("gameplay")

        let player = new Player(new KeyboardEventsManager(ui), scene, context)

        let infoView = new InfoView(ui)
        
        function createTile(x, y){
            new StarView(x, y, gameplay)
        }

        let mapSize = context.settings.mapSize
        for (let i = 0; i < mapSize / 2; i++){
                let r = context.random.getVectorSquare(0, mapSize)
                createTile(r.x, r.y)
        }
   
        
        function createPlanet(botName) {
            let position = context.random.getVectorSquare(50, scene.mapSize - 50)
            let planetView = new PlanetView(0, 0, 100, botName, '0x6699ff', gameplay);
            let planet = new Planet(planetView, scene, null, botName);
            planet.moveToPosition(position)
           
        }

        function createBot(botName) {
            let bot = new Bot(context, scene, null, botName)
            localBots.push(bot)
        }

        /**
         * @type {Bot[]}  
         */
        let localBots = []
        /*for (let i = 0; i < context.settings.botsAmount; i++){
            let botName = 'bot' + i
            createPlanet(botName)
            createBot(botName)
        }*/

        let collision = new CollisionEngine(scene, context.settings.engineFps)
        let meteorSpawner = new MeteorSpawner(context, scene, gameplay)

        new CenterCoordinatesView(0, 0, gameplay)
        new CenterCoordinatesView(100, null, gameplay)
        new CenterCoordinatesView(null, 100, gameplay)

        let tickers = []

        let scoreView = new TextView(250, 50, "123567", ui)
        new Button(450, 50, 100, 100, "☰", "white", ui, () => {
            infoView.addMessage("open menu")
            let viewSettings = new ResultViewSettings()
            scene.getPlanetsByName(player.playerName).map(
                planet => { viewSettings.playerScore = planet.score }
            )
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

        // UI tick
        tickers.push(new Ticker(engineTickerSetting, (delta) => {
            scene.getPlanetsByName(player.playerName).map(
                (planet) => { 
                    let pos = planet.transform.position;    
        
                    //move camera
                    if (context.settings.dynamicSettings.cameraMode == CameraModeEnum.showPlayer) {
                        let zoom = planet.getLevelStat().zoom
                        gameplay.pivot.set(pos.x, pos.y);
                        gameplay.scale.set(zoom) 
                    }

                    scoreView.setText(planet.level + "")
                }
            )           

            if (context.settings.dynamicSettings.cameraMode == CameraModeEnum.showMap)
                gameplay.pivot.set(context.settings.mapSize / 2,context.settings.mapSize / 2);
            

            scene.getObjects().map(t => t.tick(delta))

            infoView.tick(delta)
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
                scene.getPlanetsByName(player.playerName).map((planet) => {
                    viewSettings.playerScore = planet.score
                })
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


        let gameEvents = new GameEventManager()
        let network = new NetworkService(context.settings, infoView, gameEvents)

        let startAsPLayer = null
        let startAsBot = null

        let start = new Button(250, 450, 200, 100, "Start", "white", ui, (container) => {
            network.startGame(player.playerName)
            hideStartButtons()           
        }).container   

        function hidePlayerButtons() {
            ui.removeChild(startAsPLayer)
            ui.removeChild(startAsBot)
        }

        function hideStartButtons() {
            ui.removeChild(start)
        }


        let networkTickerSetting = new TickerSettings()
        networkTickerSetting.tickPerSeconds = context.settings.networkFps 
        networkTickerSetting.tickerTimeLimitSec = context.settings.tickerTimeLimitSec
        
        // tick network, usefull for local playing
        tickers.push(new Ticker(networkTickerSetting, (delta) => {  
            network.tick(delta)
        }))       

        // game state update to consume game events. should update fast as possible
        let fastTickerSettings = new TickerSettings()
        fastTickerSettings.tickPerSeconds = context.settings.uiFps
        fastTickerSettings.tickerTimeLimitSec = context.settings.tickerTimeLimitSec
        tickers.push(new Ticker(fastTickerSettings, (delta) => {
            network.getEvents().map((event) => {
                if (event) {
                    switch (event.eventType) {
                        case GameEventEnum.CreatePlanet:
                            let name = event.inputEvent
                            createPlanet(name)

                            // actrivate player, if planet created
                            if (name == player.playerName)
                                player.start()
                            
                            break;
    
                        case GameEventEnum.PlayerMove:
                            /**
                             * @type {InputInternal}
                             */
                            let input = event.inputEvent
                            scene.getPlanets().filter(p => p.name == input.inputId).map(planet => {
                                planet.moveByVector(event.delta, input.getVector())
                            })

                            break;


                        case GameEventEnum.GameStart:  

                            hideStartButtons()  
                        
                            startAsPLayer = new Button(100, 450, 200, 100, "as player", "white", ui, (container) => {
                                player.setPlayerMode()                            
                                network.createPlanet(player.playerName)
                                hidePlayerButtons()
                            }).container
                    
                            startAsBot = new Button(250 + 150, 450, 200, 100, "as bot", "white", ui, (container) => {
                                player.setBotMode()      
                                network.createPlanet(player.playerName)
                                hidePlayerButtons()
                            }).container

                            break;
    
                        case GameEventEnum.Tick:

                            
                            localBots.map(b => { 
                                b.tick(event.delta);
                
                                // we dont want send to network the bot input, because they should be determenistic
                                // we will send to network only player's bot
                                let sendLocally = true
                                network.sendInputMessage(b.getDirection(), sendLocally)
                            }) 

                            //debugger;

                            collision.checkPlanetsWithMeteorsCollision();
                            collision.checkPlanetsCollision();
                            meteorSpawner.networkUpdate(event.delta);
                            scene.getPlanets().map((planet) => {
                                planet.networkTick()
                            })


                            player.networkTick(event.delta)

                            if (player.isEnabled())
                                network.sendInputMessage(player.getInput())

                            break;                
                        default:
                            break;
                    }
                } 
            })
        }))
        network.connect()
    }
}