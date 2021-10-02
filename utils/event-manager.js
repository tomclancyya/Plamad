export class EventManager {

    // list of methods
    subscribers = []

    constructor() {}

    subscribe(callback) {
        this.subscribers.push(callback)
    }

    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(s => s != callback)
    }

    call(param1, param2){
        this.subscribers.map(s => s(param1, param2))
    }

}