const { Container } = require('pixi.js');
const { Text } = require('pixi.js');

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
 export class TextView {

    /** 
     * @type {Container}
     * @public
     */
    container = null;

    /** 
     * @type {Text}
     * @public
     */
    text = null;
     
    constructor (x, y, text, parent, size = 50) {
        let PIXI = require('pixi.js');
        let button = new PIXI.Graphics();
        let container = new PIXI.Container();
        let textStyle = new PIXI.TextStyle({
            fill: 'white',
            fontSize: size
        })

        let textObject = new PIXI.Text(text, textStyle);
        textObject.anchor.set(0.5)
        textObject.resolution = 4;

        container.addChild(button);
        container.addChild(textObject);
        parent.addChild(container);

        container.x = x;
        container.y = y;

        this.updateCoordinate = function(x,y) {
            container.x = x;
            container.y = y;
        }

        this.container = container;
        this.text = textObject;
    }
    
    setText(text){
        this.text.text = text;
    }
}