import * as M from '../utils/math';
import { Vector2 } from '../utils/vector2'
export class Transform {
    /** 
     * @type {Vector2}
     * @public
     */
    position = new Vector2(0, 0)  
    size = 100
    constructor(mapSize){
        this.mapSize = mapSize
    }
    
    move(vectorDelta){
        let newPosition = this.position.add(vectorDelta);
        this.position = newPosition.inscribe(0 + this.size / 2, this.mapSize - this.size / 2);
    }

    moveToPosition(position){
        this.position = position
    }

    isCollideBorder(){
        let x = this.position.x
        let y = this.position.y
        return M.isEqual(x, 0 + this.size / 2) ||
            M.isEqual(x, this.mapSize - this.size / 2) ||
            M.isEqual(y, 0 + this.size / 2) ||
            M.isEqual(y, this.mapSize - this.size / 2) 
    }

    getDistance(otherVector) {
        let sphere = this.position;
        return sphere.getDistance(otherVector)
    }

    isCollide(otherTransform) {
        let sphere = this.position;
        let other = otherTransform.position;
        var distance = sphere.getDistance(other)
        return distance < (this.size / 2 + otherTransform.size / 2);
    }

    setSize(size){
        this.size = size
        this.move(new Vector2(0,0))
    }
}