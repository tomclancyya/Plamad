/*[test]*///import pixi from "pixi-shim"; const { Application, ObservablePoint } = pixi;
/*[production]*/import { Application, ObservablePoint } from "pixi.js";
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
import { InfoView } from '../ui/info-view';
import { NetworkService } from '../engine/network-service';
import { GameEvent, GameEventEnum, GameEventManager } from '../input/game-events-manager';
import { StarView } from '../ui/star-view';

export class GameplayService {
  
    /** 
    * @param {GameContext} context  
    */
    constructor(context){

        const StatesEnum = {
            GameState: "GameState",
            MenuState: "MenuState"
        }   

        let myPlanetName = "player_" + Math.floor(Math.random() * 100)
        let currentState = StatesEnum.GameState    
        let botsOnly = false     
        
        this.context = context;
        /** 
        * @type {Application}  
        */
        let app = context.app;

        //ui container
        let ui = app.stage.getChildByName("ui")
        let gameplay = app.stage.getChildByName("gameplay")

        let infoView = new InfoView(ui)

        let inputManager = context.input
        
        function createTile(x, y){
            //new Button(x, y, 100, 100, '', '0x111111', gameplay, () => {});
            new StarView(x, y, gameplay)
        }

        let mapSize = context.settings.mapSize
        for (let i = 0; i < mapSize / 100; i++){
            for (let j = 0; j < mapSize / 100; j++){
                createTile(i * 100 + 50, j * 100 + 50)
            }
        }

        let scene = new Scene(context.settings.mapSize);    
        
        function createPlanet(botName) {
            let position = context.random.getVectorSquare(50, scene.mapSize - 50)
            let planetView = new PlanetView(0, 0, 100, botName, '0x6699ff', gameplay);
            let planet = new Planet(planetView, scene, null, botName);
            planet.moveToPosition(position)
           
        }

        function createBot(botName) {
            let bot = new Bot(context, scene, null, botName)
            bots.push(bot)
        }

        /**
         * @type {Bot[]}  
         */
        let bots = []
        for (let i = 0; i < context.settings.botsAmount; i++){
            let botName = 'bot' + i
            createPlanet(botName)
            createBot(botName)
        }

        let collision = new CollisionEngine(scene, context.settings.engineFps)
        let meteorSpawner = new MeteorSpawner(context, scene, gameplay)

        new CenterCoordinatesView(0, 0, gameplay)
        new CenterCoordinatesView(100, null, gameplay)
        new CenterCoordinatesView(null, 100, gameplay)

        

        let inputDriver = new GameInputDriver(context.input, scene)

        let tickers = []

        let scoreView = new TextView(250, 50, "123567", ui)
        new Button(450, 50, 100, 100, "☰", "white", ui, () => {
            infoView.addMessage("open menu")
            let viewSettings = new ResultViewSettings()
            scene.getPlanetsByName(myPlanetName).map(
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
            scene.getPlanetsByName(myPlanetName).map(
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
                scene.getPlanetsByName(myPlanetName).map((planet) => {
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

        let network = new NetworkService(context.settings, 
            infoView
        )

        new Button(50, 250, 100, 100, "<", "white", ui, () => {
            context.keyboardInput.arrowLeft = false
        }, () => {
            context.keyboardInput.arrowLeft = true
        })

        new Button(450, 250, 100, 100, ">", "white", ui, () => {
            context.keyboardInput.arrowRight = false
        }, () => {
            context.keyboardInput.arrowRight = true
        })

        new Button(250, 50, 100, 100, "^", "white", ui, () => {
            context.keyboardInput.arrowUp = false
        }, () => {
            context.keyboardInput.arrowUp = true
        })

        new Button(250, 450, 100, 100, "v", "white", ui, () => {
            context.keyboardInput.arrowDown = false
        }, () => {
            context.keyboardInput.arrowDown = true
        })



        let startAsPLayer = new Button(100, 450, 200, 100, "Start as player", "white", ui, (container) => {
            inputManager.playerId = myPlanetName
            network.startGame(myPlanetName)
            hideStartButtons()
        }).container

        let startAsBot = new Button(250 + 150, 450, 200, 100, "Start as bot", "white", ui, (container) => {
            let botName = "bot_" + Math.floor(Math.random() * 100)
            createBot(botName)
            myPlanetName = botName
            network.startGame(botName)
            hideStartButtons()
        }).container

        function hideStartButtons() {
            ui.removeChild(startAsPLayer)
            ui.removeChild(startAsBot)
        }

        let gameEvents = new GameEventManager()

        let networkTickerSetting = new TickerSettings()
        networkTickerSetting.tickPerSeconds = context.settings.networkFps 
        networkTickerSetting.tickerTimeLimitSec = context.settings.tickerTimeLimitSec
        
        // network tick driver
        // отправляем интпут события серверу 
        tickers.push(new Ticker(networkTickerSetting, (delta) => {
            bots.map(b => { 
                b.tick(delta);
                inputManager.addInput(b.getDirection())
            })  
            
            inputManager.getInputs().map((input) => {
                network.sendInputMessage(input)
            })

            network.tick(delta)
        }))

        // можно добавлять все события из сети добавлƒь в gameEventManager, 
        // причем консьюмеро будет сдвигать офсет
        // а гейм консьюмер будет хранить всю игру в виде событий 
        network.onReceiveNetworkTick = (delta) => {
            let event = new GameEvent()
            event.delta = network.defaultDelta
            event.eventType = GameEventEnum.Tick
            event.inputEvent = null
            gameEvents.addEvent(event)            
        }

        network.onReceivedInputMessage = (message) => {
            let event = new GameEvent()
            event.delta = network.defaultDelta
            event.eventType = GameEventEnum.PlayerMove
            event.inputEvent = message
            gameEvents.addEvent(event)
        }

        network.onReceivedCreatePlanet = (message) => {
            let event = new GameEvent()
            event.delta = network.defaultDelta
            event.eventType = GameEventEnum.CreatePlanet
            event.inputEvent = message
            gameEvents.addEvent(event)
        }


        network.onReceiveStartGame = (message) => {
            let event = new GameEvent()
            event.delta = network.defaultDelta
            event.eventType = GameEventEnum.GameStart
            event.inputEvent = message
            gameEvents.addEvent(event)
        }

        // game state update to consume game events. should update fast as possible
        let fastTickerSettings = new TickerSettings()
        fastTickerSettings.tickPerSeconds = context.settings.uiFps
        fastTickerSettings.tickerTimeLimitSec = context.settings.tickerTimeLimitSec
        tickers.push(new Ticker(fastTickerSettings, (delta) => {
            gameEvents.getEvents(10).map((event) => {
                if (event) {
                    switch (event.eventType) {
                        case GameEventEnum.CreatePlanet:
                            let name = event.inputEvent
                            createPlanet(name)
                            
                            break;
    
                        case GameEventEnum.PlayerMove:
                            inputDriver.setPlanetInput(event.inputEvent, event.delta)
                            break;


                        case GameEventEnum.GameStart:                            
                            network.createPlanet(myPlanetName)
                            break;
    
                        case GameEventEnum.Tick:
                            collision.checkPlanetsWithMeteorsCollision();
                            collision.checkPlanetsCollision();
                            meteorSpawner.networkUpdate(event.delta);
                            scene.getPlanets().map((planet) => {
                                planet.networkTick()
                            })
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