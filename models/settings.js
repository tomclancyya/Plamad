export class Settings {
    engineFps = 30
    mapSize = 2000
    maxAsteroids = 40
    maxAsteroidsSameTime = 20
    spawnAsteroidPerSecond = 1
    cameraMode = CameraModeEnum.showMap

    constructor() {}
}

export const CameraModeEnum = {
    showMap: "showMap",
    showPlayer: "showPlayer",
    showBot: "showBot"
}
