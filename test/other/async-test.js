import { done, fail, isBooleanEqual, isNumberEqual, isVector2Equal, wait } from "../test-engine/test-assertion";

export class AsyncTest {
    constructor(){}
    getTests() {
        return {
            "async test should":
            {
                "wait for 0.1 second": async () => {
                    let startTime = Date.now()
                    await wait(0.1)
                    let endTime = Date.now()
                    return isBooleanEqual( endTime-startTime >= 100, true);
                }
            }
        }
    }
}