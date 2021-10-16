import { EventManager } from "../utils/event-manager";
import { Timer } from "../utils/timer";
import { Ticker } from "./ticker";

export class Network {

    onReceiveInputMessageCallback;

    event;

    constructor() {
        this.event = new EventManager()

        let sendMessagePollingIntervalMs = 100
        let timer = new Timer(sendMessagePollingIntervalMs)
        let checkTimerPerSecond = 30
        let ticker = new Ticker(checkTimerPerSecond, (delta) => {
            if (timer.isFinished()) {
                this.messagesToSend.map(i => this._receiveInputMessage(sendMessagePollingIntervalMs, i))
                timer.reset()
            }
            timer.update(delta)            
        })        


    }

    messagesToSend = []

    sendInputMessage(input){
        this.messagesToSend = this.messagesToSend.filter(m => m.playerName != input.playerName)
        this.messagesToSend.push(input)      
    }

    _receiveInputMessage(delta, input){
        this.event.call(delta, input);
    }

    subscribeForInputMessage(callback) {
        this.event.subscribe(callback)
    }
}