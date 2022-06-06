import { Ticker, TickerSettings } from "../../engine/ticker";
import { done } from "./test-assertion";


export class TickerTest {
    constructor(){}
    getTests() {
        return {
            "ticker should":
            {
                "tick 5 times and stop": () => {                    
                    function sayHi() {
                        console.log("Привет");
                      }
                    let settings = new TickerSettings
                    settings.tickPerSeconds = 1
                    settings.tickerTimeLimitSec = 5
                    let ticker = new Ticker(settings, sayHi); 
                    let int = new IntervalMock()   
                    ticker.interval = int.sayHi();
                    console.log(ticker.interval);

                    return done();   
                }
                
            
            } 
        }
    }
}

class IntervalMock {
    constructor() { }

    sayHi() {
        console.log('ее');
      }

      
}
