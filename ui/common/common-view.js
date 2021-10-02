
/*[test]*/import pixi from "pixi-shim";
/*[production]*///import pixi from "pixi.js";

const { Container } = pixi;
import { Vector2 } from "../../utils/vector2";

// пока не используется, но может будем использовать для интерполяции передвижения контейнера в UI
export class CommonView {
    /** 
     * @type {Container}
     * @public
     */
    container = null
    constructor(container){
        this.container = container
        this.container.x
    }

    /**
     * 
     * @param {Vector2} newPosition 
     */
    updatePosition(newPosition) {
        this.container.position.x = newPosition.x
        this.container.position.y = newPosition.y
    }
}