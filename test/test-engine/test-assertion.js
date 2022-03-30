
import * as M from '../../utils/math';

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

export function isVector2Equal(a, b){
    return assert(a, b, (a.isEqual(b))) 
}

export function done(){
    return assert(0, 0, true) 
}