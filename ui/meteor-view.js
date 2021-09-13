const { Container } = require('pixi.js');
 export class MeteorView {

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
    constructor (x, y, diameter, backgroundColor = '0xcc6600', parent) {
    let radius = diameter / 2
    let PIXI = require('pixi.js');
    let mainCircle = new PIXI.Graphics();
    
    let container = new PIXI.Container();
    let textStyle = new PIXI.TextStyle({
        fill: 'white'
        //align : 'center'
    })

    function createCrater(radius) {
        let crater = new PIXI.Graphics();
        crater.beginFill('0x663300').lineStyle(2, '0x331a00', 1);    
        crater.drawCircle(0, 0, radius);
        crater.endFill();
        return crater;
    }

    mainCircle.beginFill(backgroundColor).lineStyle(5, 'red', 1);    
    mainCircle.drawEllipse(0, 0, diameter, diameter / 1.333);
    mainCircle.angle = -33;
    mainCircle.endFill();
    //mainCircle.pivot.set(radius, radius);

    let crater = createCrater(radius / 2);
    crater.pivot.set(radius / 2, radius / 3);
    
    let crater2 = createCrater(radius / 3);
    crater2.pivot.set(-radius / 2, -radius / 3);
    
    let crater3 = createCrater(radius / 4);
    crater3.pivot.set(-diameter / 1.5, radius / 4);

    container.addChild(mainCircle);
    container.addChild(crater);
    container.addChild(crater2);
    container.addChild(crater3);
    parent.addChild(container);

    container.x = x;
    container.y = y;

    this.container = container;


    this.delete = function() {
        parent.removeChild(container)
    }

    return this;
}
}