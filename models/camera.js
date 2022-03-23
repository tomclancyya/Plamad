/*[test]*/import pixi from "pixi-shim"; const { Application } = pixi;
/*[production]*///import { Application } from "pixi.js";
import { CameraModeEnum, Settings } from "./settings";

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

    setMenuMode(stage){
        stage.position.x = 0;
        stage.position.y = 0;
        stage.scale.set(1) 
        stage.pivot.set(0,0);
    }

    setCameraBySettings(stage){
        let cameraMode = this.settings.cameraMode
        switch (cameraMode) {
            case CameraModeEnum.showPlayer:
                this.setFollowPlayerMode(stage)
                break;

            case CameraModeEnum.showMap:
                this.setSeeWholeMapMode(stage)
                break;

            case CameraModeEnum.showBot:
                this.setFollowPlayerMode(stage)
                break;
        }
    }

    setFollowPlayerMode(stage){
        //(0,0) for us is center of the screen
        stage.position.x = this.app.renderer.width/2;
        stage.position.y = this.app.renderer.height/2;
        //scale it
        //stage.scale.set(0.5) 
        stage.scale.set(0.4) 
    }

    setSeeWholeMapMode(stage){

        let mapSize = this.settings.mapSize
        let m = -0.00004
        let k = 0.28
        let y = m * mapSize + k
        //(0,0) for us is center of the screen
        stage.position.x = this.app.renderer.width/2;
        stage.position.y = this.app.renderer.height/2;
        //scale it
        stage.scale.set(y) 

    }
}