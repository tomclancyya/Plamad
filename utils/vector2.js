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

    flipY(){
        return new Vector2(this.x, -this.y)
    }

    add(a){
        return new Vector2(M.add(this.x, a.x), M.add(this.y, a.y))
    }

    multiValue(a){
        return new Vector2(M.multi(this.x, a), M.multi(this.y, a))
    }
    
    trim(min, max){
        let trimMin = new Vector2(Math.max(this.x, min), Math.max(this.y, min))
        let trimMax = new Vector2(Math.min(trimMin.x, max), Math.min(trimMin.y, max))
        return trimMax;
    }

    /**
     * 
     * @param {Vector2} otherVector2 
     * @returns 
     */
    manhattanDistance(otherVector2){
        return  Math.abs (x1 - x2) + Math.abs (y1 - y2)
    } 

    /**
     * 
     * @param {Vector2} otherVector2 
     * @returns 
     */
    getDistance(otherVector2){
        return M.sqrt(M.sqr(this.x - otherVector2.x),(this.x - otherVector2.x) +
        M.sqr(this.y - otherVector2.y),(this.y - otherVector2.y));
    }

}