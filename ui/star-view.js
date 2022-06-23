import { Container, Graphics } from "pixi.js";

export class StarView {

    constructor(x, y, parent) {
        let star = new Graphics();

        star.beginFill(0xffffff);    
        star.drawCircle(x, y, 2)
        star.endFill()

        parent.addChild(star)
    }


}