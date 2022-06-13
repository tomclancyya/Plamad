
import { InputInternal } from "../input/input-internal";
import { NetworkMode, Settings } from "../models/settings";
import { InfoView } from "../ui/info-view";
import { Ticker, TickerSettings } from "./ticker";

export class NetworkService {

    isLocalMode = false;

    defaultDelta = 33;

    currentState = NetworkStatesEnum.NotConnected

    /** 
     * @type {InputInternal[]}
     * @private
     */
    messagesBuffer = []

    /**
     * 
     * @param {Settings} settings 
     * @param {*} callback 
     * @param {InfoView} infoView
     */
    constructor(settings, infoView){
        this.settings = settings
        this.infoView = infoView

        this.defaultDelta = 1000 / settings.networkFps

        if (this.settings.dynamicSettings.networkMode == NetworkMode.local) {
            this.isLocalMode = true;
        }

        if (this.settings.dynamicSettings.networkMode == NetworkMode.online) {
            this.isLocalMode = false;
        }
    }

    tick(delta) {
        if (this.isLocalMode) {
            this.onReceiveNetworkTick(delta)
        } else {
            
        }
    }

    connect() {
        if (this.isLocalMode) {
            this.currentState = NetworkStatesEnum.WaitingPlayers
            this.infoView.addMessage('connected locally')
        } else {
            this.infoView.addMessage('trying to connect to server')
            this.connectToServer();
        }
    }

    /**
     * @private
     */
    connectToServer(){
        
        let webSocketClient = new WebSocket(this.settings.networkAddress)
        webSocketClient.onopen = (event) => {
            this.infoView.addMessage('connected to server')
            this.currentState = NetworkStatesEnum.WaitingPlayers
            this.infoView.addMessage(event.data) 
        }
        webSocketClient.onmessage = (event) => {


            try {
                /**
                 * @type {Message}
                 */
                let message = JSON.parse(event.data)
                if (message.type == MessageTypeEnum.Tick) {
                        this.onReceiveNetworkTick(message.delta)
                }   

                if (message.type == MessageTypeEnum.PlayerMove) {
                    this.onReceivedInputMessage(message.message)
                }   

                if (message.type == MessageTypeEnum.GameStart) {
                    this.currentState = NetworkStatesEnum.Playing
                    this.infoView.addMessage('got event: game started') 
                    this.onReceiveStartGame()
                }   

                if (message.type == MessageTypeEnum.CreatePlanet) {
                    this.onReceivedCreatePlanet(message.senderId)
                    this.infoView.addMessage('planet added: ' + message.senderId) 
                }  
                
                
            } catch (error) {
                console.error(error)
                console.error(event.data)
            }
          
        }
        
        this.webSocketClient = webSocketClient
    }

    createPlanet(planetName){
        if (this.currentState != NetworkStatesEnum.Playing)
            return

        if (this.isLocalMode)
            this.onReceivedCreatePlanet(planetName)
        else {
            if (this.webSocketClient == null) {
                console.log('not connected to server!')
                return;
            }

            let networkMessage = new Message()
            networkMessage.senderId = planetName
            networkMessage.type = MessageTypeEnum.CreatePlanet
            networkMessage.delta = this.defaultDelta
            networkMessage.message = null
            this.webSocketClient.send(JSON.stringify(networkMessage))
        }    
    }

    startGame(playerName){
        if (this.currentState != NetworkStatesEnum.WaitingPlayers)
            return

        if (this.isLocalMode) {
            this.currentState = NetworkStatesEnum.Playing
            this.onReceiveStartGame()
        } else {
            if (this.webSocketClient == null) {
                console.log('not connected to server!')
                return;
            }

            let networkMessage = new Message()
            networkMessage.senderId = playerName
            networkMessage.type = MessageTypeEnum.GameStart
            networkMessage.delta = this.defaultDelta
            networkMessage.message = null
            this.webSocketClient.send(JSON.stringify(networkMessage))
        }
    }

    

    /**
     * 
     * @param {InputInternal} message 
     */
    sendInputMessage(message){
        if (this.currentState != NetworkStatesEnum.Playing)
            return

        if (this.isLocalMode)
            this.onReceivedInputMessage(message)
        else {
            if (this.webSocketClient == null) {
                console.log('not connected to server!')
                return;
            }

            let networkMessage = new Message()
            networkMessage.senderId = message.inputId
            networkMessage.message = message
            networkMessage.type = MessageTypeEnum.PlayerMove
            networkMessage.delta = this.defaultDelta
            this.webSocketClient.send(JSON.stringify(networkMessage))
        }    

    }

    onReceiveNetworkTick(delta) {
        throw Error("onReceiveNetworkTick was not assigned!")
    }

    onReceivedInputMessage(message) {
        throw Error("onReceivedInputMessage was not assigned!")
    }

    onReceivedCreatePlanet() {
        throw Error("callback onReceivedCreatePlanet was not assigned!")
    }

    onReceiveStartGame() {
        throw Error("onReceiveStartGame was not assigned!")
    }
    

    disconnect(){

    }
}

export class NetworkServiceSettings {
    expectedFps
    tickerTimeLimitSec
    constructor(){}
}

export class Message {

    /** 
     * @type {Number}
     * @public
     */
    senderId
    
    /** 
     * @type {Number}
     * @public
     */
    delta

    /**
     *  @type {String} MessageTypeEnum
     */
     type = MessageTypeEnum.None

     /** 
     * @type {String}
     * @public
     */
    message
    
    constructor(){}
}

export const MessageTypeEnum = {
    None: "None",
    Tick: "Tick",
    PlayerMove: "PlayerMove",
    GameStart: "GameStart",
    CreatePlanet: "CreatePlanet",
    Message: "Message"
}

export const NetworkStatesEnum = {
    NotConnected: "NotConnected",
    WaitingPlayers: "WaitingPlayers",
    Playing: "Playing"
}