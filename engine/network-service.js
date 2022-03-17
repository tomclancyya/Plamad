
import { InputInternal } from "../input/input-internal";
import { Ticker, TickerSettings } from "./ticker";

export class NetworkService {

    isLocalMode = false;

    localTicker = null

    /** 
     * @type {InputInternal[]}
     * @private
     */
    messagesBuffer = []

    /**
     * 
     * @param {NetworkServiceSettings} settings 
     * @param {*} callback 
     */
    constructor(settings, callback){
        this.settings = settings
        this.callback = callback
    }

    connectToServer(){
        console.log('connected to server')
        this.isLocalMode = true

        let tickerSettings = new TickerSettings()
        tickerSettings.tickPerSeconds = this.settings.expectedFps
        tickerSettings.tickerTimeLimitSec = this.settings.tickerTimeLimitSec
        this.localTicker = new Ticker(tickerSettings, () => {
            this.onReceiveNetworkMessage()
        })
    }

    /**
     * 
     * @param {InputInternal} message 
     */
    addMessageToBuffer(message){

    }

    onReceiveNetworkMessage(delta){
        this.callback(delta)
    }

    disconnect(){

    }
}

export class NetworkServiceSettings {
    expectedFps
    tickerTimeLimitSec
    constructor(){}
}