

export class BackgroundView {

    constructor(parent){
        let PIXI = require('pixi.js');

        let back = new PIXI.Graphics();

        let width = 500
        let height = 500

        back.beginFill(0x332211)
        back.drawRect(0, 0, width, height);
        back.endFill();
        back.pivot.set(width / 2, height / 2);
        parent.addChild(back);

        
    }

}