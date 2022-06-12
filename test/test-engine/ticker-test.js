import { Ticker, TickerSettings } from "../../engine/ticker";
import { done, isBooleanEqual, isNumberEqual } from "./test-assertion";


export class TickerTest {
    constructor(){}
    getTests() {
        return {
            "ticker should":
            {
                // "tick 3 times and stop by calling clearInterval": () => {                    
                //     function blankFunction() {
                //         // return undefined;
                //     }

                //     let tickerSettings = new TickerSettings()
                //     tickerSettings.tickPerSeconds = 1
                //     tickerSettings.tickerTimeLimitSec = 3
                    
                //     let tick = null  
                //     Ticker.prototype.setInterval = function (callback, delta) {
                //         tick = callback
                //     }

                //     let stop = false
                //     Ticker.prototype.clearInterval = function () {
                //         stop = true
                //     }

                //     let ticker = new Ticker(tickerSettings, blankFunction);                     
                //     isNumberEqual(ticker.ticks, 0)
                //     isBooleanEqual(stop, false)
                //     tick()
                //     isNumberEqual(ticker.ticks, 1)
                //     isBooleanEqual(stop, false)
                //     tick()
                //     isNumberEqual(ticker.ticks, 2)
                //     isBooleanEqual(stop, false)
                //     tick()
                //     isNumberEqual(ticker.ticks, 3)
                //     isBooleanEqual(stop, false)
                //     tick()
                //     isNumberEqual(ticker.ticks, 0)    
                //     isBooleanEqual(stop, true)         
                //     return done();   
                // },
                // "click on counter in the check function": () => {                    
                //     let counter = 0
                //     function checkFunction() {                        
                //         counter++                                                            
                //     }

                //     let tickerSettings = new TickerSettings()
                //     tickerSettings.tickPerSeconds = 1
                //     tickerSettings.tickerTimeLimitSec = 2 //можно убрать, похуй

                //     let tick = null  
                //     Ticker.prototype.setInterval = function (callback, delta) {
                //         tick = callback
                //     }
                                                   
                //     let ticker = new Ticker(tickerSettings, checkFunction);                      
                //     tick()                                    
                //     return isNumberEqual(counter, 1);                                                          
                // },                
                // "infinity": () => {                    
                //     let counter = 0
                //     function checkFunction() {                        
                //         counter++    
                //         console.log(counter);                                                        
                //     }

                //     let tickerSettings = new TickerSettings()
                //     tickerSettings.tickPerSeconds = 1
                //     tickerSettings.tickerTimeLimitSec = 1

                //     let tick = null  
                //     Ticker.prototype.setInterval = function (callback, delta) {
                //         tick = callback
                //     }
                                                   
                //     let ticker = new Ticker(tickerSettings, checkFunction);                      
                //     tick()   
                //     tick()
                //     tick()
                //     tick()                                 
                //     return done();
                // },
                "where is delta value": () => {                
                    
                    function blankFunction(delta) {                        
                        console.log(delta);                                                
                    }

                    let tickerSettings = new TickerSettings()
                    tickerSettings.tickPerSeconds = 1
                    tickerSettings.tickerTimeLimitSec = 10  
                    
                    tickerSettings.ticker
                                                   
                    let ticker = new Ticker(tickerSettings, blankFunction);     
                    
                    
                    //isNumberEqual(ticker.ticks, 6)
                                          
                    return done();
                }

            
            } 
        }
    }
}

