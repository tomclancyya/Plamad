
/*[test]*/import pixi from "pixi-shim"; const { Container } = pixi;
/*[production]*///import { Container } from "pixi.js";
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
    }

    setSize(diameter){
        
    }

    /**
     * 
     * @param {Vector2} newPosition 
     */
    updatePosition(newPosition) {
        this.container.position.x = newPosition.x
        this.container.position.y = newPosition.y
    }

    delete(){
        this.container.destroy();
    }
}