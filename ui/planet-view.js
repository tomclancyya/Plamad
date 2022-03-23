
/*[test]*/import pixi from "pixi-shim"; const { Container } = pixi;
/*[production]*///import { Container } from "pixi.js";

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

    radius = null;

    circle = null;
    backgroundColor

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
    constructor (x, y, diameter, text, backgroundColor = '0x6699ff', parent) {

    this.backgroundColor = backgroundColor
    let PIXI = require('pixi.js');
    let circle = new PIXI.Graphics();
    let container = new PIXI.Container();
    let textStyle = new PIXI.TextStyle({
        fill: 'white'
        //align : 'center'
    })

  
    this.circle = circle;
    this.setSize(diameter)

    let textObject = new PIXI.Text(text, textStyle);
    textObject.anchor.set(0.5)
    textObject.resolution = 4;

    container.addChild(circle);
    container.addChild(textObject);
    parent.addChild(container);

    container.x = x;
    container.y = y;

    this.container = container;

    this.delete = function() {
        parent.removeChild(container)
    }
}

    setSize(diameter){
        this.radius = diameter / 2
        this.drawCircle()
    }

    drawCircle() {
        this.circle.beginFill(this.backgroundColor).lineStyle(5, 'red', 1);    
        this.circle.drawCircle(0, 0, this.radius);
        this.circle.endFill();
    }

    setGrayColor(){
        this.backgroundColor = '0x003300'
        this.drawCircle()
    }



}