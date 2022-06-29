import { EventManager } from "../../utils/event-manager";
import { done, isNumberEqual, isVector2Equal } from "../test-engine/test-assertion";

export const EmptyTestShort = [ 
    "short test should",
    [
        "be succesfully done of cource", () => {
            return done();
        }
    ]
]