import { Camera } from "../../models/camera"
import { done, isNumberEqual } from "../test-engine/test-assertion";
/*[test]*///import pixi from "pixi-shim"; const { Application, Container } = pixi;
/*[production]*/import { Application, Container } from "pixi.js";
import { CameraModeEnum, DynamicSettings, Settings } from "../../models/settings";

export class CameraTest {
    constructor() { }
    getTests() {
        return {
            "Camera should":
            {
                "set container scale as 1 and position as 0 and pivot as 0 for setMenuMode method": () => {
                    let container = new ContainerMock()
                    let camera = new Camera(null, null)
                    camera.setMenuMode(container)
                    isNumberEqual(container.position.x, 0);
                    isNumberEqual(container.position.y, 0);
                    isNumberEqual(container.scale.x, 1);
                    isNumberEqual(container.pivot.x, 0);
                    isNumberEqual(container.pivot.y, 0);
                    return done()
                },
                "set container scale as 0.12 and position X as 400 and position Y as 300 for setSeeWholeMapMode method": () => {
                    let container = new ContainerMock()
                    let application = new ApplicationMock()
                    let camera = new Camera(application, new Settings())
                    camera.setSeeWholeMapMode(container)
                    isNumberEqual(container.position.x, 400);
                    isNumberEqual(container.position.y, 300);
                    isNumberEqual(container.scale.x, 0.12);
                    return done()
                },
                "set container scale as 0.4 and position X as 400 and position Y as 300 for setFollowPlayerMode method": () => {                
                    let container = new ContainerMock()
                    let application = new ApplicationMock()
                    let camera = new Camera(application, null)
                    camera.setFollowPlayerMode(container)
                    isNumberEqual(container.position.x, 400);
                    isNumberEqual(container.position.y, 300);
                    isNumberEqual(container.scale.x, 0.4);
                    return done()
                },
                "set container scale as 0.4 and position X as 400 and position Y as 300 when Camera in showPlayer mode": () => {                                
                    let container = new ContainerMock()
                    let application = new ApplicationMock()
                    let camera = new Camera(application, new Settings())
                    camera.setCameraBySettings(container)
                    isNumberEqual(container.position.x, 400);
                    isNumberEqual(container.position.y, 300);
                    isNumberEqual(container.scale.x, 0.4);
                    return done()
                },
                "set container scale as 0.12 and position X as 400 and position Y as 300 when Camera in showMap mode": () => {                                                
                    let container = new ContainerMock()
                    let application = new ApplicationMock()
                    let modify = new Settings
                    modify.dynamicSettings.cameraMode = CameraModeEnum.showMap;
                    let camera = new Camera(application, modify)
                    camera.setCameraBySettings(container)
                    isNumberEqual(container.position.x, 400);
                    isNumberEqual(container.position.y, 300);
                    isNumberEqual(container.scale.x, 0.12);
                    return done()
                },
                "set container scale as 0.4 and position X as 400 and position Y as 300 when Camera in showBot mode": () => {                                                
                    let container = new ContainerMock()
                    let application = new ApplicationMock()
                    let modify = new Settings
                    modify.dynamicSettings.cameraMode = CameraModeEnum.showBot;
                    let camera = new Camera(application, modify)
                    camera.setCameraBySettings(container)
                    isNumberEqual(container.position.x, 400);
                    isNumberEqual(container.position.y, 300);
                    isNumberEqual(container.scale.x, 0.4);
                    return done()
                }
            }
        }
    }
}

class ContainerMock {
    position = {
        x: -1,
        y: -1
    }
    scale = {
        x: -3,
        set: function (x) {
            this.x = x
        }
    }
    pivot = {
        x: -1,
        y: -1,
        set: function (x, y) {
            this.x = x
            this.y = y
        }
    }
    constructor() { }
}

class ApplicationMock {
    renderer = {
        width: 800,
        height: 600
    }
    constructor() { }
}
