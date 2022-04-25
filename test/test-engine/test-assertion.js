
import * as M from '../../utils/math';
import { Vector2 } from '../../utils/vector2';

export function assert(a, b, isSucccess){
    if (isSucccess) {
        return { result: "OK", color: "\x1b[32m" }
    }
    else {
        console.log(new Error().stack)
        throw { result: "FAIL", color:"\x1b[31m", message: "left: " + JSON.stringify(a) + ", right: " + JSON.stringify(b) }
                
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

