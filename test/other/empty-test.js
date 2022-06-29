import { EventManager } from "../../utils/event-manager";
import { done, isNumberEqual, isVector2Equal } from "../test-engine/test-assertion";

export class EmptyTest {
    constructor(){}
    getTests() {
        return {
            "empty test should":
            {
                "be succesfully done": () => {
                    return done();
                }
            }
        }
    }
}