import * as M from '../utils/math';

export class Vector2 {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    getZero(){
        return new Vector2(0, 0)
    }

    getNormalized(){
        let lenght = this.getLenght()
        if (M.isEqual(lenght, 0))
            return this.getZero()
        else
            return new Vector2(this.x / lenght, this.y / lenght)
    }

    getLenght(){        
        return M.sqrt(M.add(M.sqr(this.x), M.sqr(this.y)));
    }

    isEqual(b){
        return (M.isEqual(this.x, b.x) && M.isEqual(this.y, b.y))
    }

    isNotEqual(b){
        return !this.isEqual(b)
    }
   
    flipY(){
        return new Vector2(this.x, -this.y)
    }

    add(a){
        return new Vector2(M.add(this.x, a.x), M.add(this.y, a.y))
    }

    substract(a){
        return new Vector2(M.sub(this.x, a.x), M.sub(this.y, a.y))
    }

    multiValue(a){
        return new Vector2(M.multi(this.x, a), M.multi(this.y, a))
    }
    
    /** 
     * fits (inscribes) vector into a given area
     * @param {number} min
     * @param {number} max
     * @returns {Vector2} 
    */
    inscribe(min, max){
        let inscribeMin = new Vector2(Math.max(this.x, min), Math.max(this.y, min))
        let inscribeMax = new Vector2(Math.min(inscribeMin.x, max), Math.min(inscribeMin.y, max))
        return inscribeMax;
    }

    /**
     * 
     * @param {Vector2} otherVector2 
     * @returns 
     */
    manhattanDistance(otherVector2){
        return  Math.abs (this.x - otherVector2.x) + Math.abs (this.y - otherVector2.y)
    } 

    /**
     * 
     * @param {Vector2} otherVector2 
     * @returns 
     */
    getDistance(otherVector2){
        return M.sqrt(M.sqr(this.x - otherVector2.x) +
        M.sqr(this.y - otherVector2.y));
    }



}