
/**
 * @interface
 */
 export class BaseTimer {

    // ms
    constructor(timeout){
       
    }

    update(delta){
        console.log("not implemented")
    }

    isFinished(){
        console.log("not implemented")
    }

    reset() {
        console.log("not implemented")
    }
}