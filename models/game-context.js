import { Random } from "../engine/random";
import { InputPlayer } from "../input/input-player";
import { Scene } from "./scene";
//need to comment this, because pixi cannot be run in nodejs for test
//import { Application } from "pixi.js";

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