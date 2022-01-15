export class Ticker {
    
    /**
     * 
     * @param {Number} tickPerSeconds max - 60fps (setInterval cannot call faster than 16ms)
     * @param {*} callback 
     */
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