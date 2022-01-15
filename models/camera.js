/*[test]*///import pixi from "pixi-shim"; const { Application } = pixi;
/*[production]*/import { Application } from "pixi.js";
import { Settings } from "./settings";

export class Camera {

    /** 
    * Camera
    * @param {Application} app  
    * @param {Settings} settings
    */
    constructor(app, settings) {
        this.app = app
        this.settings = settings
    }

    setMenuMode(){

        let stage = this.app.stage
        stage.position.x = 0;
        stage.position.y = 0;
        stage.scale.set(1) 
        stage.pivot.set(0,0);
    }

    setFollowPlayerMode(){
        let stage = this.app.stage
        //(0,0) for us is center of the screen
        stage.position.x = this.app.renderer.width/2;
        stage.position.y = this.app.renderer.height/2;
        //scale it
        stage.scale.set(0.5) 
    }

    setSeeWholeMapMode(){
        let stage = this.app.stage
        //(0,0) for us is center of the screen
        stage.position.x = this.settings.mapSize / 2;
        stage.position.y = this.settings.mapSize / 2;
        //scale it
        stage.scale.set(1) 

    }
}