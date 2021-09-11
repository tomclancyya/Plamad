// created this class to investigate the determenizm of the math operation and substitute the operation to the determenistic one

const epsilon = 0.001
 
    export function add(a, b){
        return a + b;
    }

    export function sub(a, b){
        return a - b;
    }

    export function div(a, b){
        return a / b;
    }

    export function multi(a, b){
        return a * b;
    }

    export function sqrt(a){
        return Math.sqrt(a);
    }

    export function sqr(a){
        return Math.pow(a, 2);
    }

    export function abs(a){
        return Math.abs(a)
    }

    export function isEqual(a, b){
        return (abs(a - b) < epsilon)
    }

