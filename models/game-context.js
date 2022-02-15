
/*[test]*///import pixi from "pixi-shim"; const { Application } = pixi;
/*[production]*/import { Application } from "pixi.js";

import { Random } from "../engine/random";
import { MutableInputManager } from "../input/mutable-input-manager";
import { GameplayService } from "../stage/gameplay-service";
import { MenuService } from "../stage/menu-service";
import { Camera } from "./camera";
import { Scene } from "./scene";
import { Settings } from "./settings"

export class GameContext {

    /** 
    * @type {Application}  
    */
   app
    
    /** 
    * @type {MutableInputManager}   
    */
    input
   
    /** 
    * @type {Scene}
    */
    currentScene = null;

    /**
     * @type {Random}
     */
    random = null;


    /**
     * @type {Camera}
     */
     camera = null


    /** @type {Settings} */
    settings = new Settings()

    dynamicSettings = {
        cameraTarget: null
    }

    constructor(app, input, random){
        this.app = app;
        this.input = input;
        this.random = random;
        this.camera = new Camera(app, this.settings)
    }

    cleanStage(){
        for (let i = this.app.stage.children.length - 1; i >= 0; i--) {	
            this.app.stage.removeChild(this.app.stage.children[i]);
        };  
    }

    loadMenu(){
        this.camera.setMenuMode()
        this.cleanStage()
        new MenuService(this);   
    }

    loadGameplay(){
        this.camera.setCameraBySettings()

        this.cleanStage()
        new GameplayService(this);
    }
    

    
}