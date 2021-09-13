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

    isCollide(otherTransform) {
        let sphere = this.position;
        let other = otherTransform.position;
        var distance = Math.sqrt((sphere.x - other.x) * (sphere.x - other.x) +
        (sphere.y - other.y) * (sphere.y - other.y));
        return distance < (this.size / 2 + otherTransform.size / 2);
    }
}