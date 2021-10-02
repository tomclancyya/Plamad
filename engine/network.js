import { EventManager } from "../utils/event-manager";
import { Timer } from "../utils/timer";
import { Ticker } from "./ticker";

export class Network {

    onReceiveInputMessageCallback;

    event;

    constructor() {
        this.event = new EventManager()

        let timer = new Timer(100)
        let ticker = new Ticker(30, (delta) => {
            if (timer.isFinished()) {
                this.messagesToSend.map(i => this._receiveInputMessage(delta, i))
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