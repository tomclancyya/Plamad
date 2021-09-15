import { EventManager } from "../../utils/event-manager";
import { done, isEqual, isNumberEqual, isVector2Equal } from "../test-assertion";

export class EventManagerTest {
    constructor(){}
    getTests() {
        return {
            "event manager should":
            {
                "add two subscribers and call them": () => {

                    let isCall1 = 0
                    let isCall2 = 0

                    let f1 = function() {
                        isCall1 += 1;
                    }

                    let f2 = function() {
                        isCall2+= 1;
                    }

                    let event = new EventManager()
                    event.subscribe(f1)
                    event.subscribe(f2)
                    event.call()

                    isEqual(isCall1, 1)
                    isEqual(isCall2, 1)
                    isEqual(event.subscribers.length, 2)

                    event.unsubscribe(f1)
                    event.unsubscribe(f2)

                    isEqual(event.subscribers.length, 0)

                    event.call()

                    isEqual(isCall1, 1)
                    isEqual(isCall2, 1)
                    return done();
                }
            }
        }
    }
}