import { Container } from "pixi.js";


/**
 * @param {number} radius
 * @param {number} height
 * @param {string} text
 * @param {Container} parent
 */
 export class CenterCoordinatesView {

    /** 
     * @type {Container}
     * @public
     */
    container = null;

    /** 
    * @param {number} x
    * @param {number} y  
    * @param {number} diameter 
    * @param {string} text 
    * @param {string} backgroundColor 
    * @param {Container} parent 
    */     
    constructor (x, y, parent) {
    let color = '0xffffff'
    let PIXI = require('pixi.js');
    let lineVertical = new PIXI.Graphics();
    let lineHorizontal = new PIXI.Graphics();
    let container = new PIXI.Container();
    let textStyle = new PIXI.TextStyle({
        fill: 'white'
        //align : 'center'
    })

    lineVertical.beginFill(color).lineStyle(1, color, 1);    
    lineVertical.drawRect(0, 0, -100, 1);
    lineVertical.endFill();

    lineHorizontal.beginFill(color).lineStyle(1, color, 1);    
    lineHorizontal.drawRect(0, 0, 1, -100);
    lineHorizontal.endFill();

    if (y != null){
        let textY = new PIXI.Text(y, textStyle);   
        textY.position.x = -105
        textY.resolution = 4;
        container.addChild(textY);
    }

    if (x != null) {
        let textX = new PIXI.Text(x, textStyle);   
        textX.position.y = -110
        textX.position.x = 5
        textX.resolution = 4;
        container.addChild(textX);
    }

    container.addChild(lineVertical);
    container.addChild(lineHorizontal);
    parent.addChild(container);

    container.x = x == null ? 0 : x;
    container.y = y == null ? 0 : y;

    this.container = container;

    return this;
}
}