const { Container } = require('pixi.js');

// maybe will help with blurry text
//PIXI.settings.PRECISION_FRAGMENT = 'highp'; //this makes text looks better
 //this.renderer = PIXI.autoDetectRenderer(845, 451, { antialias: false, transparent: true });      
 //this.renderer.roundPixels = true; //and this too

/**
 * @param {number} radius
 * @param {number} height
 * @param {string} text
 * @param {Container} parent
 */
 export class PlanetView {

    /** 
     * @type {Container}
     * @public
     */
    container = null;

    /** 
    * @param {number} x
    * @param {number} y  
    * @param {number} radius 
    * @param {string} text 
    * @param {string} backgroundColor 
    * @param {Container} parent 
    */     
    constructor (x, y, radius, text, backgroundColor = '0x6699ff', parent) {

    let PIXI = require('pixi.js');
    let circle = new PIXI.Graphics();
    let container = new PIXI.Container();
    let textStyle = new PIXI.TextStyle({
        fill: 'white'
        //align : 'center'
    })

    circle.beginFill(backgroundColor).lineStyle(5, 'red', 1);    
    circle.drawCircle(0, 0, radius);
    circle.endFill();
    circle.pivot.set(radius, radius);

    let textObject = new PIXI.Text(text, textStyle);
    textObject.anchor.set(0.5)
    textObject.resolution = 4;

    container.addChild(circle);
    container.addChild(textObject);
    parent.addChild(container);

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