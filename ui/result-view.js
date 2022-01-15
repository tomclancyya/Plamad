import { BackgroundView } from "./background-view";
import { Button } from "./button-view";
import { TextView } from "./text-view";



export class ResultView {
 /**
   * Represents a app.
   * @param {GameContext} context
   */ 

     /** 
     * @type {Container}
     * @public
     */
      container = null;


    constructor (parent, scoreAmount, restartCallback, mainMenuCallback) {

        let PIXI = require('pixi.js');
        let container = new PIXI.Container();
        container.x = 0
        container.y = 0
        parent.addChild(container);
        let back = new BackgroundView(container)
        let result = new TextView(0, -150, "Results", container)
        let playerResult = new TextView(0, -50, "Your score: " + scoreAmount, container, 30)
        let buttonRestart = new Button(-120, 150, 100, 100, "restart", "white", container, () => {
            parent.removeChild(container)
            restartCallback()
        })
        let buttonMenu = new Button(0, 150, 100, 100, "menu", "white", container, () => {
            parent.removeChild(container)
            mainMenuCallback()
        })
        let buttonClose = new Button(120, 150, 100, 100, "back", "white", container, () => {
            parent.removeChild(container)
        })
    }

}