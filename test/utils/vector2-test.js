import { Vector2 } from "../../utils/vector2"
import { done, isNumberEqual, isVector2Equal } from "../test-engine/test-assertion";

export class Vector2Test {
    constructor(){}
    getTests() {
        return {
            "vector2 should":
            {
                "return lenght ~ 1.414 of Vector(1,1)": () => {
                    return isNumberEqual(new Vector2(1, 1).getLenght(), 1.414);
                },
                "return lenght ~ 3.6 of Vector(2, 3)": () => {
                    return isNumberEqual(new Vector2(2, 3).getLenght(), 3.605);
                },
                "return normalized Vector as expected": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[1,0], [1,0]],
                        [[0,1], [0,1]],
                        [[0,0], [0,0]],
                        [[2,0], [1,0]],
                        [[0,2], [0,1]],
                        [[1,1], [0.707, 0.707]],
                        [[-1,-1], [-0.707, -0.707]],
                        [[0,-10], [0,-1]],
                        [[-10,0], [-1,0]],
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        isVector2Equal(v1.getNormalized(), v2)
                    })
                    return done()
                }
                
            }
        }
    }
}