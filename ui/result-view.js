import { ObservablePoint } from "pixi.js";
import { BackgroundView } from "./background-view";
import { Button } from "./button-view";
import { ResultViewSettings, ResultViewType } from "./result-view-settings";
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

    /** 
     * @param {Container} parent
     * @param {ResultViewSettings} settings
     */
    constructor (parent, settings, restartCallback, mainMenuCallback, backCallback = () => {}) {

        let PIXI = require('pixi.js');
        let container = new PIXI.Container();
        container.x = 250
        container.y = 250
        parent.addChild(container);
        let back = new BackgroundView(container)
        let viewTitle = "No title"
        switch (settings.resultViewType) {
            case ResultViewType.ResultMenu:
                viewTitle = "Results"
                break

            case ResultViewType.LevelMenu:
                viewTitle = "Level Menu"
                break
        }

        let viewTtile = settings.resultViewType == ResultViewType.ResultMenu
        let result = new TextView(0, -150, viewTitle, container)
        let playerResult = new TextView(0, -50, "Your score: " + settings.playerScore, container, 30)

        let bestPlayerAndScore = settings.bestPlayerName + ' ' + settings.bestPlayerScore
        if (settings.resultViewType == ResultViewType.ResultMenu)
            new TextView(0, -100, "Best player: " + bestPlayerAndScore, container, 30)

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
            backCallback()
        })
    }

}