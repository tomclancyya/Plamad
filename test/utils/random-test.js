import Prando from "prando";
import { Random } from "../../engine/random";
import { Vector2 } from "../../utils/vector2";
import { isNumberEqual, isBooleanEqual, isVector2Equal, isVector2NotEqual } from "../test-engine/test-assertion";


export class RandomTest {
    constructor(){}
    getTests() {

        return {
            "random should":
            {
            "return random vector within -1 and 1 with seed=1": () => {
                let randomizerEngine = new Prando (1)
                let random = new Random (randomizerEngine)
                let result = random.getVector()
                return isVector2Equal(result, new Vector2(0.0001259006094480597,0.031479597797496206))
            },
            "return random vector within -1 and 1 with seed=2": () => {
                let randomizerEngine = new Prando (2)
                let random = new Random (randomizerEngine)
                let result = random.getVector()
                return isVector2Equal(result, new Vector2(0.00025180098606547574,0.06251669047924624))
            },
            "return different values of seed 2 != values seed 1": () => {
                let randomizerWithSeed1 = new Prando (1)
                let randomizerWithSeed2 = new Prando (2)
                let random = new Random (randomizerWithSeed1)
                let random2 = new Random (randomizerWithSeed2)
                let result = random.getVector()
                let result2 = random2.getVector()             
                return isVector2NotEqual(result, result2)
            },        
            "return values in diapazone -2 and 2": () => {
                let randomizer = new Prando (1)
                let random = new Random (randomizer)
                let min = -2
                let max = -1
                let randomVector = random.getVectorSquare(min, max)  
                let x = randomVector.x 
                let y = randomVector.y
                let isXInsideRange = (x >= min && x <= max)
                isBooleanEqual(isXInsideRange, true)
                let isYInsideRange = (y >= min && y <= max)
                return isBooleanEqual(isYInsideRange, true)                                        
            },        
            "return values in diapazone -100 and 0": () => {
                let randomizer = new Prando (1)
                let random = new Random (randomizer)
                let min = -100
                let max = 0
                let randomVector = random.getVectorSquare(min, max)  
                let x = randomVector.x 
                let y = randomVector.y
                let isXInsideRange = (x >= min && x <= max)
                isBooleanEqual(isXInsideRange, true)
                let isYInsideRange = (y >= min && y <= max)
                return isBooleanEqual(isYInsideRange, true)                                        
            },        
            "return values in diapazone 0 and 2": () => {
                let randomizer = new Prando (1)
                let random = new Random (randomizer)
                let min = 0
                let max = 2
                let randomVector = random.getVectorSquare(min, max)  
                let x = randomVector.x 
                let y = randomVector.y
                let isXInsideRange = (x >= min && x <= max)
                isBooleanEqual(isXInsideRange, true)
                let isYInsideRange = (y >= min && y <= max)
                return isBooleanEqual(isYInsideRange, true)                                        
            }
              
        }}
        // test with seed 2
        // test values of seed 2 <> values seed 1 
        // getVectorSquare (-2,2), 0,2 -100, 0
        //  key word : random seed, randomier, determination
    }
}
