
import * as M from '../../utils/math';
import { Vector2 } from '../../utils/vector2';

export function assert(a, b, isSucccess){
    if (isSucccess) {
        return { result: "OK", color: "\x1b[32m" }
    }
    else {
        /**
         * @type {String}
         */
        let stack = new Error().stack

        // break the textblock into an array of lines
        let lines = stack.split('\n');
        // remove one line, starting at the first position
        let finalText = lines.splice(2);
        // join the array back into a single string
        stack = finalText.join('\n');

        // cut the first line:
        //console.log( stack.substring(stack.indexOf("\n") + 1) );
        throw { result: "FAILED", color:"\x1b[31m", message: "expected: " 
            + JSON.stringify(a) 
            + "\n     but got : " + JSON.stringify(b) + "\n"   
            + "\n" + stack 
    }
                
    }    
}

export function isBooleanEqual(a, b){
    return assert(a,b, (a == b)) 
}

export function isNumberEqual(a, b){
    return assert(a,b, M.isEqual(a, b)) 
}

/**
 * 
 * @param {Vector2} a 
 * @param {Vector2} b 
 * @returns 
 */
export function isVector2Equal(a, b){
    return assert(a, b, (a.isEqual(b))) 
}

export function isVector2NotEqual(a, b){
    return assert(a, b, (a.isNotEqual(b))) 
}

export function done(){
    return assert(0, 0, true) 
}

export function fail(){
    return assert(0, 0, false) 
}

export function doneAsync(){
    return assert(0, 0, true) 
}

export async function wait(seconds){
    await new Promise((resolve, reject) => {
        setTimeout(() => { 
            resolve("ready")
        } , seconds * 1000)
      });
} 