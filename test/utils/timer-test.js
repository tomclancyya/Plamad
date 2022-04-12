import { isEqual } from "../../utils/math"
import { Timer } from "../../utils/timer"
import { assert, isBooleanEqual, isNumberEqual } from "../test-engine/test-assertion"


export class TimerTest {
    constructor(){}
    getTests() {
        return {
            "timer should":
            {
                "stop the countdown in 5 sec": () => {
                    let timer = new Timer (5000)                    
                    console.log(timer.currentTime/1000);
                    console.log('isFinished =', timer.isFinished());
                    timer.update (1000); 
                    console.log(timer.currentTime/1000);
                    console.log('isFinished =', timer.isFinished());
                    timer.update (1000); 
                    console.log(timer.currentTime/1000);
                    console.log('isFinished =', timer.isFinished());
                    timer.update (1000); 
                    console.log(timer.currentTime/1000);
                    console.log('isFinished =', timer.isFinished());
                    timer.update (1000); 
                    console.log(timer.currentTime/1000);
                    console.log('isFinished =', timer.isFinished());
                    timer.update (1000); 
                    console.log(timer.currentTime/1000);
                    console.log('isFinished =', timer.isFinished());
                    return isBooleanEqual(timer.isFinished(),true)   
                },
                "return true when the value of current time = 0": () => {
                    let timer = new Timer (0)                                                                                             
                    return isNumberEqual(timer.currentTime, 0)
                },

                "get the initial value after reset": () => {
                    let timer = new Timer (5000)
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000);                     
                    console.log();
                    console.log('Current time = ', timer.currentTime);
                    console.log('isFinished with the current time = ', timer.isFinished());                                
                    timer.reset()    
                    console.log('isFinished after reset = ', timer.isFinished());                                        
                    return isNumberEqual(timer.currentTime, 5000)
                }
                
                
            
            } 
        }
    }
}