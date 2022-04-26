import { Vector2 } from "../../utils/vector2"
import { done, isBooleanEqual, isNumberEqual, isVector2Equal } from "../test-engine/test-assertion";

export class Vector2Test {
    constructor(){}
    getTests() {
        return {
            "vector2 should":
            {
                "return true when compare unequal vectors": () => {
                    return isBooleanEqual(new Vector2(0, 1).isNotEqual(0, 1.5), true);
                },
                "return lenght ~ 1.414 of Vector(1,1)": () => {
                    return isNumberEqual(new Vector2(1, 1).getLenght(), 1.414);
                },
                "return lenght ~ 3.6 of Vector(2, 3)": () => {
                    return isNumberEqual(new Vector2(2, 3).getLenght(), 3.605);
                },
                "return normalized Vector as expected": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[1, 0], [1, 0]],
                        [[0, 1], [0, 1]],
                        [[0, 0], [0, 0]],
                        [[2, 0], [1, 0]],
                        [[0, 2], [0, 1]],
                        [[1, 1], [0.707, 0.707]],
                        [[-1, -1], [-0.707, -0.707]],
                        [[0, -10], [0, -1]],
                        [[-10, 0], [-1, 0]],
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        isVector2Equal(v1.getNormalized(), v2)
                    })
                    return done()
                },
                "return Vector(0,0)": () => {
                    let vectorsForAssertions = [
                        [4, 5],
                        [-100, -100],
                        [0.0001259006094480597, 0.031479597797496206],
                        [0, 0],
                        [1, 0]
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let result = new Vector2(assertion[0][0], assertion[0][1])
                        let expected = new Vector2(0, 0)
                        isVector2Equal(result, expected)
                    })
                    return done()
                },
                "return flipped Vector as expected": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[4, 5], [4, -5]],
                        [[-100, -1000], [-100, 1000]],
                        [[-0.0001259006094480597, 0.031479597797496206], [-0.0001259006094480597, -0.031479597797496206]],
                        [[0, 0], [0, 0]],
                        [[0.6548, 0], [0.6548, 0]]
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        isVector2Equal(v1.flipY(), v2)
                    })
                    return done()
                },
                "return sum of two vectors": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[0, 1], [5, 5], [5, 6]],
                        [[-1000, -100], [-9, 500], [-1009, 400]],
                        [[-0.0001259006094480597, 0.031479597797496206], [0, -500], [-0.0001259, -499.9685204022025]],
                        [[0, 0], [0, 0], [0, 0]]
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        let v3 = new Vector2(assertion[2][0], assertion[2][1])
                        isVector2Equal(v1.add(v2), v3)
                    })
                    return done()
                },
                "return difference of two vectors": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[0, 1], [5, 5], [-5, -4]],
                        [[-1000, -100], [-9, 500], [-991, -600]],
                        [[-0.0001259006094480597, 0.031479597797496206], [0, -500], [-0.0001259006094480597, 500.03148]],
                        [[0, 0], [0, 0], [0, 0]]
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        let v3 = new Vector2(assertion[2][0], assertion[2][1])
                        isVector2Equal(v1.substract(v2), v3)
                    })
                    return done()
                },
                "return product of two vectors": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[1, 3], [2], [2, 6]],
                        [[-1000, 100], [-9], [9000, -900]],
                        [[-0.0001259006094480597, 0.031479597797496206], [500], [-0.06295030472402985, 15.739798898748102]],
                        [[0, 0], [0, 0], [0, 0]]
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = assertion[1][0]
                        let v3 = new Vector2(assertion[2][0], assertion[2][1])
                        isVector2Equal(v1.multiValue(v2), v3)
                    })
                    return done()
                },
                "return trimmed values of Vector as expected": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[10, 6], [1, 8], [8, 6]],
                        [[-1000, 6], [1, 8], [1, 6]],
                        [[6, 6], [2, 7], [6, 6]],
                        [[-8, 4], [-2, 5], [-2, 4]],
                        [[-10, -0.0001259006094480597], [-4, 4], [-4, -0.0001259006094480597]],
                        [[0, 0], [0, 0], [0, 0]],
                        [[10, -1], [-9, -2], [-2, -2]]
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let min = assertion[1][0]
                        let max = assertion[1][1]
                        let v3 = new Vector2(assertion[2][0], assertion[2][1])
                        isVector2Equal(v1.trim(min, max), v3)
                    })
                    return done()
                },
                "return Manhattan distance between points": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[5, 7], [4, 3], [5]],
                        [[-1000, -100], [-9, 500], [1591]],
                        [[-0.0001259006094480597, 0.031479597797496206], [0, 0], [0.032]],
                        [[0, 0], [0, 0], [0]],
                        [[9, 9], [9, 9], [0]],
                        [[5999999999999999, 79999999999999], [-4999999999, -39999999999999], [6120004999999996]],
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        let expected = assertion[2][0]
                        isNumberEqual(v1.manhattanDistance(v2), expected)
                    })
                    return done()
                },
                "return distance between points": () => {
                    let vectorsForAssertions = [
                        //[input, expected]
                        [[5, 7], [4, 3], [4.123]],
                        [[-1000, -100], [-9, 500], [1158.482]],
                        [[-0.0001259006094480597, 0.031479597797496206], [0, 0], [0.03147984956214987]],
                        [[0, 0], [0, 0], [0]],
                        [[9, 9], [9, 9], [0]],
                        [[5999999999999999, 79999999999999], [-4999999999, -39999999999999], [6001204879024292]],
                    ]
                    vectorsForAssertions.map((assertion) => {
                        let v1 = new Vector2(assertion[0][0], assertion[0][1])
                        let v2 = new Vector2(assertion[1][0], assertion[1][1])
                        let expected = assertion[2][0]
                        isNumberEqual(v1.getDistance(v2), expected)
                    })
                    return done()                    
                }
            }
        }
    }
}
