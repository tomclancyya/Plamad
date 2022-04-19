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
                               
                },
                "return Vector(0,0)": () => {
                let zero = new Vector2(0, 0)                
                return isVector2Equal(new Vector2(4,5).getZero(), zero);
                },
                "return fliped Vector": () => {
                let fliped = new Vector2(4, -5)                
                return isVector2Equal(new Vector2(4, 5).flipY(), fliped);
                },
                "return sum of two vectors": () => {
                let initial = new Vector2(5, 6)                
                return isVector2Equal(new Vector2(0, 1).add(new Vector2(5,5)), initial); 
                },
                "return difference of two vectors": () => {
                let initial = new Vector2(5, 6)                
                return isVector2Equal(new Vector2(7, 7).substract(new Vector2(2,1)), initial); 
                },
                "return product of two vectors": () => {
                let initial = new Vector2(2, 6)                
                return isVector2Equal(new Vector2(1, 3).multiValue(2), initial); 
                
                },
                "return trimed values of Vector": () => {
                let trim = new Vector2(10,6).trim(1,8);                
                return isVector2Equal(trim,new Vector2(8,6))
                
                },
                "return Manhattan distance = 5 between points of (5,7) and (4,3)": () => {                
                let mdistance = new Vector2(5,7).manhattanDistance(new Vector2(4,3));                
                return isNumberEqual(mdistance, 5)
                
                },
                "return distance ~4.123 between points of (5,7) and (4,3)": () => {                
                let distance = new Vector2(5,7).getDistance(new Vector2(4,3));                
                return isNumberEqual(distance, 4.123)
                
                }

                
            }
        }
 
    }
}