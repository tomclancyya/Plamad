import { BaseTimer } from "./base-timer";

export class Timer extends BaseTimer {
    timeout = null;
    currentTime = null;

    // ms
    constructor(timeout){
        super(timeout) // без этой строчки кидает undefined is not an object
        this.timeout = timeout
        this.currentTime = timeout
        //super(timeout)
    }

    update(delta){
        this.currentTime = this.currentTime - delta
    }

    isFinished(){
        return this.currentTime < 0;
    }

    reset() {
        this.currentTime = this.timeout;
    }
}
