export class Ticker {
    

    constructor(tickPerSeconds, callback){
        this.previousTime = Date.now();
        let delta = (1 / tickPerSeconds) * 1000;
        this.interval = setInterval(() => {
            callback(delta)
        }, delta)
    }

    stop() {
        clearInterval(this.interval)
    }
}