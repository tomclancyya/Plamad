import { add, sub } from "../../utils/math";
import { isNumberEqual } from "../test-engine/test-assertion";


export class MathTest {
    constructor(){}
    getTests() {
        return {
            "math should":
            {
                "должен при сложении 1 и 2 возвращать 3": () => {
                    let result = add(1, 2)
                    return isNumberEqual(result, 3);
                }               
            }
        }
    }
}
                