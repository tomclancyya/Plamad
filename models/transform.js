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
        this.position = newPosition.trim(0 + this.size / 2, this.mapSize - this.size / 2);
    }
}