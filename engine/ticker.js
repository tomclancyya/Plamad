
export class Ticker {
    

    constructor(tickPerSeconds, callback){
        this.previousTime = Date.now();
        let delta = (1 / tickPerSeconds) * 1000;
        setInterval(() => {
            //let delta = Date.now() - this.previousTime;
            //this.previousTime = Date.now()
            //console.log(delta)
            callback(delta)
        }, delta)
    }
}