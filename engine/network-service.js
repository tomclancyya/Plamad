
import { InputInternal } from "../input/input-internal";
import { NetworkMode, Settings } from "../models/settings";
import { info } from "../node_modules.nosync/log-symbols";
import { InfoView } from "../ui/info-view";
import { Ticker, TickerSettings } from "./ticker";

export class NetworkService {

    isLocalMode = false;

    defaultDelta = 33

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
            this.infoView.addMessage('connected locally')
        } else {
            this.infoView.addMessage('trying to connect to server')
            this.connectToServer();
        }
    }

    connectToServer(){
        
        let webSocketClient = new WebSocket(this.settings.networkAddress)
        webSocketClient.onopen = (event) => {
            console.log('connected to server')
            this.infoView.addMessage(event.data) 
        }
        //webSocketClient.send("pidor")
        webSocketClient.onmessage = (event) => {
            //this.infoView.addMessage(event.data) 

            console.log(event)


            try {
                /**
                 * @type {Message}
                 */
                let message = JSON.parse(event.data)
                //if (message.message) {
                    this.onReceiveNetworkTick(message.delta)   
                    //TODO: parse type of message to trigger proper event   
                    this.onReceivedInputMessage(message.message)
                //}
                
            } catch (error) {
                console.error(error)
                console.error(event.data)
            }
          
        }
        
        this.webSocketClient = webSocketClient
    }

    

    /**
     * 
     * @param {InputInternal} message 
     */
    sendInputMessage(message){
        if (this.isLocalMode)
            this.onReceivedInputMessage(message)
        else {
            if (this.webSocketClient == null) {
                console.log('not connected to server!')
                return;
            }

            let networkMessage = new Message()
            networkMessage.senderId = "player1"
            networkMessage.message = message
            networkMessage.delta = this.defaultDelta
            this.webSocketClient.send(JSON.stringify(networkMessage))
        }    

    }

    onReceiveNetworkTick(delta) {
        throw Error("was not assigned!")
    }

    onReceivedInputMessage(message) {
        throw Error("was not assigned!")
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
     * @type {String}
     * @public
     */
    message
    
    constructor(){}
}