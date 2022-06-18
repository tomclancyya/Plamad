"use strict"
import { Application } from "pixi.js";

import { Button } from "./button-view";
import { GameContext } from "../models/game-context";

//const { Application } = require("pixi.js");
export class MenuView {
  /**
   * Represents a app.
   * @param {GameContext} context
   */ 

  constructor (context, singlePlayerClick, onlyBotsClick, multiplayerClick, settingsClick) {
    this.context = context;    
    function createMenuButton(x, y, text, parent, onlick) {
        return new Button(x, y, 350, 100, text, '0x2c3e50', parent, onlick);
    }
    this.buttons = [
      createMenuButton(250, 25 + 50, 'Single Player', context.app.stage, () => { this.close(); singlePlayerClick() }).container,
      createMenuButton(250, 25 + 50 + 100 + 20, 'Only bots', context.app.stage, () => { this.close(); onlyBotsClick() }).container,
      createMenuButton(250, 25 + 50 + 100 + 20 + 100 + 20,'Multiplayer', context.app.stage, multiplayerClick).container,
      createMenuButton(250, 25 + 50 + 100 + 20 + 100 + 20 + 100 + 20, 'Multiplayer bots', context.app.stage, settingsClick).container,
    ]
  }

  close(){
    this.buttons.map(b => this.context.app.stage.removeChild(b));
  }
}
