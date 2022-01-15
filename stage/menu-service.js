import { GameContext } from '../models/game-context';
import { GameplayService } from './gameplay-service';


const { Application } = require('pixi.js');
let  { MenuView }  = require('../ui/menu-view');

export class MenuService { 
    /** 
    * @param {GameContext} context  
    */
    constructor(context) {
        new MenuView(context, () => {
            context.loadGameplay();
        }, ()=>{}, ()=>{}, ()=>{});
    }
}