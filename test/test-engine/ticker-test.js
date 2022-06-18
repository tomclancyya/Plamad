import { Ticker, TickerSettings } from "../../engine/ticker";
import { done, isBooleanEqual, isNumberEqual } from "./test-assertion";


export class TickerTest {
    constructor() { }
    getTests() {
        return {
            "ticker should":
            {"tick 3 times and stop by calling clearInterval": () => {
                function blankFunction() {
                }

                let tickerSettings = new TickerSettings()
                tickerSettings.tickPerSeconds = 1
                tickerSettings.tickerTimeLimitSec = 3

                let tick = null
                Ticker.prototype.setInterval = function (callback, delta) {
                    tick = callback
                }

                let stop = false
                Ticker.prototype.clearInterval = function () {
                    stop = true
                }

                let ticker = new Ticker(tickerSettings, blankFunction);
                isNumberEqual(ticker.ticks, 0)
                isBooleanEqual(stop, false)
                tick()
                isNumberEqual(ticker.ticks, 1)
                isBooleanEqual(stop, false)
                tick()
                isNumberEqual(ticker.ticks, 2)
                isBooleanEqual(stop, false)
                tick()
                isNumberEqual(ticker.ticks, 0)
                isBooleanEqual(stop, true)
                return done();
            },
            "call callback with counter only 1 time, when call tick 1 time": () => {
                let counter = 0
                function checkFunction() {
                    counter++
                }

                let tickerSettings = new TickerSettings()
                tickerSettings.tickPerSeconds = 1

                let tick = null
                Ticker.prototype.setInterval = function (callback, delta) {
                    tick = callback
                }

                let ticker = new Ticker(tickerSettings, checkFunction);
                tick()
                return isNumberEqual(counter, 1);
            },
            "do not stop to tick when tickerTimeLimitSec = 0 (should tick 10 times)": () => {
                let counter = 0
                function checkFunction() {
                    counter++
                }

                let tickerSettings = new TickerSettings()
                tickerSettings.tickPerSeconds = 1
                tickerSettings.tickerTimeLimitSec = 0

                let tick = null
                Ticker.prototype.setInterval = function (callback, delta) {
                    tick = callback
                }

                Ticker.prototype.clearInterval = function () {
                    counter = 0
                }

                let ticker = new Ticker(tickerSettings, checkFunction);
                tick()
                tick()
                tick()
                tick()
                tick()
                tick()
                tick()
                tick()
                tick()
                tick()
                return isNumberEqual(counter, 10);
            },
            "return 333 when tickPerSeconds = 3": () => {
                let check = null
                function checkFunction(delta) {
                    check = delta
                }

                let tickerSettings = new TickerSettings()
                tickerSettings.tickPerSeconds = 3
                tickerSettings.tickerTimeLimitSec = 1

                let tick = null
                Ticker.prototype.setInterval = function (callback, delta) {
                    tick = callback
                }

                let ticker = new Ticker(tickerSettings, checkFunction);
                tick()
                return isNumberEqual(check, 333);
            }              
            }
        }
    }
}

