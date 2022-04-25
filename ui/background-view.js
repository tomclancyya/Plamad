

export class BackgroundView {

    constructor(parent, width = 500, height = 500, alpha = 1){
        let PIXI = require('pixi.js');

        let back = new PIXI.Graphics();
        back.alpha = alpha
        back.beginFill(0x332211)
        back.drawRect(0, 0, width, height);
        back.endFill();
        back.pivot.set(width / 2, height / 2);
        parent.addChild(back);

        
    }

}