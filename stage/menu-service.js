/*[test]*/import pixi from "pixi-shim"; const { Application } = pixi;
/*[production]*///import { Application } from "pixi.js";


import { GameContext } from '../models/game-context';
import { GameplayService } from './gameplay-service';

import  { MenuView } from '../ui/menu-view';
import { CameraModeEnum } from "../models/settings";

export class MenuService { 
    /** 
    * @param {GameContext} context  
    */
    constructor(context) {
        new MenuView(context, () => {
            context.settings.cameraMode = CameraModeEnum.showPlayer
            context.loadGameplay();
        }, ()=>{
            context.settings.cameraMode = CameraModeEnum.showMap
            context.loadGameplay();

        }, ()=>{}, ()=>{});
    }
}