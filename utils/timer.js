export class Timer {
    timeout;
    currentTime;
    constructor(timeout){
        this.timeout = timeout
        this.currentTime = timeout
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