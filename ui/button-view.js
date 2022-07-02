import { Container, Graphics, Text, TextStyle } from "pixi.js";


// maybe will help with blurry text
//PIXI.settings.PRECISION_FRAGMENT = 'highp'; //this makes text looks better
 //this.renderer = PIXI.autoDetectRenderer(845, 451, { antialias: false, transparent: true });      
 //this.renderer.roundPixels = true; //and this too

/**
 * @param {number} width
 * @param {number} height
 * @param {string} text
 * @param {Container} parent
 */
 export class Button {

    /** 
     * @type {Container}
     * @public
     */
    container = null;
     
    constructor (x, y, width, height, text, buttonColor = '0x2c3e50', parent, callback, callback2) {
    let button = new Graphics();
    let container = new Container();
    let textStyle = new TextStyle({
        fill: 'white'
        //align : 'center'
    })

    if (buttonColor)
        button.beginFill(0x2c3e50).lineStyle(5, 'red', 1);    
    else
        button.beginFill(0x2c3e50, 0.01).lineStyle(0, 'blue', 1);        
    
    button.drawRoundedRect(0, 0, width, height, 0);
    button.endFill();
    button.pivot.set(width / 2, height / 2);
    button.interactive = true;
    button.buttonMode = true;

    if (callback)
        button.on('pointerup', () => { callback(container) })

    if (callback2)
        button.on('pointerdown', () => { callback2(container) })


    let textObject = new Text(text, textStyle);
    textObject.anchor.set(0.5)
    textObject.resolution = 4;

    container.addChild(button);
    container.addChild(textObject);
    parent.addChild(container);

    container.buttonMode = true;
    container.x = x;
    container.y = y;

    this.updateCoordinate = function(x,y) {
        container.x = x;
        container.y = y;
    }

    this.container = container;

    return this;
}
}