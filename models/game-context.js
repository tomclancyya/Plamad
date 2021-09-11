import { Input } from "./input";

const { Application } = require("pixi.js");

export class GameContext {
    /** 
    * @param {Application} app  
    */

    /** 
    * @param {Input} input  
    */

    settings = {
        engineFps: 30,
        mapSize: 2000
    }

    constructor(app, input){
        this.app = app;
        this.input = input;
    }
    
}