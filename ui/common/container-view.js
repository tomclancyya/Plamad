import { Container } from "pixi.js";

// пока не используется, но может будем использовать для интерполяции передвижения контейнера в UI
export class ContainerView {
    /** 
     * @type {Container}
     * @public
     */
    container = null
    constructor(container){
        this.container = container
    }

    move(newPosition){
        this.container.x = newPosition.x;
        this.container.y = newPosition.y;
    }
}