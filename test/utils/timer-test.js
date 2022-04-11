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
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    return isBooleanEqual(timer.isFinished(),true)
   
                },
                "return the starting value": () => {
                    let timer = new Timer (5000)
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000);                     
                    timer.reset()                                                               
                    return isNumberEqual(timer.currentTime, 5000)
                }
                
                
            
            } 
        }
    }
}