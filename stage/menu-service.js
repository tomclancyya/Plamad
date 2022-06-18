import { Application } from "pixi.js";


import { GameContext } from '../models/game-context';
import { GameplayService } from './gameplay-service';

import  { MenuView } from '../ui/menu-view';
import { CameraModeEnum, NetworkMode } from "../models/settings";

export class MenuService { 
    /** 
    * @param {GameContext} context  
    */
    constructor(context) {
        new MenuView(context, () => {
            context.settings.dynamicSettings.cameraMode = CameraModeEnum.showPlayer
            context.settings.dynamicSettings.networkMode = NetworkMode.local
            context.loadGameplay();
        }, ()=>{
            context.settings.dynamicSettings.cameraMode = CameraModeEnum.showMap
            context.settings.dynamicSettings.networkMode = NetworkMode.local
            context.loadGameplay();
        }, ()=>{
            context.settings.dynamicSettings.cameraMode = CameraModeEnum.showPlayer
            context.settings.dynamicSettings.networkMode = NetworkMode.online
            context.loadGameplay();
        }, ()=>{
            context.settings.dynamicSettings.cameraMode = CameraModeEnum.showMap
            context.settings.dynamicSettings.networkMode = NetworkMode.online
            context.loadGameplay();
        });
    }
}