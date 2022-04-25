import { InputInternal } from "./input-internal";

/**
 * storing all game events, like planet directions and ticks
 * this events helps to replay the game from beginning
 */
export class GameEventManager { 

    /**
     * @type {GameEvent[]}
     */
    events = []

    /**
     * @type {Number}
     */
    offset = 0

    constructor () {}


    /**
     * @param {GameEvent}
     */
    addEvent(event){
        this.events.push(event)
    }

    /**
     * 
     * @returns {GameEvent}
     */
    getEvent(){
        // TODO: for memory optimisation we should use queue.shift(); 
        if (this.offset < this.events.length - 1) {
            let event = this.events[this.offset]
            this.offset++
            return event
        } else {
            return null
        }

    }

    getEvents(amount) {
        let events = []
        while (events.length - 1 < amount && this.offset < this.events.length - 1) {
            events.push(this.events[this.offset])
            this.offset++
        }
        return events;
    }
}

/**
 * TODO: maybe we will add time stamp for each event 
 */
export class GameEvent {
    /**
     *  @type {String} GameEventEnum
     */
    eventType = GameEventEnum.none

    delta = 0

    /**
     * @type {InputInternal}
     */
    inputEvent = null
    constructor () {}

}

export const GameEventEnum = {
    None: "None",
    Tick: "Tick",
    PlayerMove: "PlayerMove",
    GameStart: "GameStart"
}