import { abs, add, div, isEqual, multi, sqr, sqrt, sub } from "../../utils/math";
import { isNumberEqual, isBooleanEqual } from "../test-engine/test-assertion";


export class MathTest {
    constructor(){}
    getTests() {
        return {
            "math should":
            {"should return false if compare 2 and 300": () => {
                let result = isEqual(2, 300)
                return isBooleanEqual(result, false)
            },
            "should return true if compare 300 and 300": () => {
                let result = isEqual(300, 300)
                return isBooleanEqual(result, true)
            },
            "should return true when compare the negative numbers of -3 and -3": () => {
                let result = isEqual(-3, -3)
                return isBooleanEqual(result, true);
            },
            "should return false when compare the negative number of -3 and 3": () => {
                let result = isEqual(-3, 3)
                return isBooleanEqual(result, false)
            },
            "should return false when compare the floating numbers of 0.001 and 0.002": () => {
                let result = isEqual(0.001, 0.002)
                return isBooleanEqual(result, false);
            },
            "should return true when compare the floating numbers of 0.001 and 0.0019": () => {
                let result = isEqual(0.001, 0.0019)
                return isBooleanEqual(result, true);
            },
            "should return 3 when 1 plus 2": () => {
                let result = add(1, 2)
                return isNumberEqual(result, 3); 
            },
             "should return 2 when 5 minus 3": () => {
                 let result = sub(5, 3)
                 return isNumberEqual(result, 2);
             },
            "should return 3 when 6 divide by 2": () => {
                let result = div(6, 2)
               return isNumberEqual(result, 3);
            },
            "should return 10 when 5 multiply by 2": () => {
                let result = multi(5, 2)
                return isNumberEqual(result, 10); 
            },
            "should return 4 when take the square root of 16": () => {
                let result = sqrt(16)
                return isNumberEqual(result, 4);     
            },
            "should return 9 when take 3 in the 2 power": () => {
                let result = sqr(3, 2)
                return isNumberEqual(result, 9); 
            },
            "should return 5 when take the absolute value of -5": () => {
                let result = abs(-5)
                return isNumberEqual(result, 5);
            },
            "should return 4 when -8 divided by -2": () => {
                let result = div(-8, -2)
                return isNumberEqual(result, 4);
            },
            "should return -6 when 3 multiply by -2": () => {
                let result = multi(3, -2)
                return isNumberEqual(result, -6); 
            },
            "should return 6 when -3 multiply by -2": () => { 
                let result = multi(-3, -2)
                return isNumberEqual(result, 6);
            }   
            } 
        }
    }
}