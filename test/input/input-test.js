import { InputPlayer } from "../../input/input-player";
import { Vector2 } from "../../utils/vector2";
import { isBooleanEqual, isVector2Equal } from "../test-engine/test-assertion";

export class InputTest {
    getTests() {
        return {
            "input should":
            {
                "return up right directiont": () => {
                    let input = new InputPlayer()
                    input.isUp = true;
                    input.isRight = true;

                    let res = input.getInputDirection()
                    return isVector2Equal(res, new Vector2(0.707, 0.707))
                },

                "return down right direction": () => {
                    let input = new InputPlayer()
                    input.isDown = true;
                    input.isRight = true;

                    let res = input.getInputDirection()
                    return isVector2Equal(res, new Vector2(0.707, -0.707))
                },

                "return down direction": () => {
                    let input = new InputPlayer()
                    input.isDown = true;

                    let res = input.getInputDirection()
                    return isVector2Equal(res, new Vector2(0, -1))
                },

                "return left direction": () => {
                    let input = new InputPlayer()
                    input.isLeft = true;

                    let res = input.getInputDirection()
                    return isVector2Equal(res, new Vector2(-1, 0))
                }
            }
        }
    }
}