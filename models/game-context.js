
/*[test]*///import pixi from "pixi-shim"; const { Application } = pixi;
/*[production]*/import { Application } from "pixi.js";

import { Random } from "../engine/random";
import { InputPlayer } from "../input/input-player";
import { Scene } from "./scene";

export class GameContext {
    /** 
    * @param {Application} app  
    */
    app
    /** 
    * @param {InputPlayer} input  
    */
   
    /** 
    * @type {Scene} scene  
    */
    scene = null;

    /**
     * @type {Random}
     */
    random;


    settings = {
        engineFps: 30,
        mapSize: 2000
    }

    constructor(app, input, random){
        this.app = app;
        this.input = input;
        this.random = random;
    }
    
}