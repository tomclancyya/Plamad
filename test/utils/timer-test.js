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
                    isBooleanEqual(timer.isFinished(),false);                    
                    timer.update (1000);                   
                    isBooleanEqual(timer.isFinished(),false);
                    timer.update (1000);
                    isBooleanEqual(timer.isFinished(),false);
                    timer.update (1000);
                    isBooleanEqual(timer.isFinished(),false);
                    timer.update (1000);
                    isBooleanEqual(timer.isFinished(),false);
                    timer.update (1000);                                   
                    return isBooleanEqual(timer.isFinished(),true)   
                },
                "return true when the value of current time = 0": () => {
                    let timer = new Timer (0)  
                    return isBooleanEqual(timer.isFinished(), true)
                },

                "get the initial value after reset": () => {
                    let timer = new Timer (5000)
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000); 
                    timer.update (1000);                                      
                    isBooleanEqual(timer.isFinished(),true)
                    timer.reset()                        
                    isBooleanEqual(timer.isFinished(), false)
                    return isNumberEqual(timer.currentTime, 5000)
                }
                
                
            
            } 
        }
    }
}