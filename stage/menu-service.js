import { GameContext } from '../models/game-context';
import { GameplayService } from './gameplay-service';


const { Application } = require('pixi.js');
let  { MenuView }  = require('../ui/menu-view');

export class MenuService { 
    /** 
    * @param {GameContext} context  
    * @ param {function(MenuView)} menuView
    */
    constructor(context) {
        new MenuView(context, () => {
            new GameplayService(context);
        }, ()=>{}, ()=>{}, ()=>{});
    }
}