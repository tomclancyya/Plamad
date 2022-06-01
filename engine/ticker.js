import * as M from './../utils/math';
export class Ticker {

    // setInterval
    // how to clear setInterval
    // how to test setInterval
    
    /**
     * 
     * @param {TickerSettings} settings max - 60fps (setInterval cannot call faster than 16ms)
     * @param {*} callback 
     */
    constructor(settings, callback){
        let tickPerSeconds = settings.tickPerSeconds
        let limit = settings.tickerTimeLimitSec
        let delta = M.div(1,tickPerSeconds) * 1000;
        this.ticks = 0

        
        this.interval = this.setInterval(() => {
            this.ticks++;
            if (limit != 0 && this.ticks > tickPerSeconds * limit) {
                this.ticks = 0;
                this.stop()
            }

            callback(delta)
        }, delta)
    }

    setInterval(callback, delta) {
        return setInterval(callback, delta)
    }

    clearInterval(interval){
        clearInterval(interval)
    }


    stop() {
        this.clearInterval(this.interval)
    }
}

export class TickerSettings {
    /**
     * @type {number}
     * @public
     */
    tickPerSeconds = 0

    /** 
     * @type {number}
     * @public
     */
    tickerTimeLimitSec
    constructor(){}
}