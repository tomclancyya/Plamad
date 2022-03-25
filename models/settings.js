export class Settings {
    uiFps = 60
    engineFps = 30
    mapSize = 4000
    maxAsteroids = 400
    maxAsteroidsSameTime = 5
    spawnAsteroidPerSecond = 1
    cameraMode = CameraModeEnum.showPlayer
    botsAmount = 20
    tickerTimeLimitSec = 0 //0 is infinity

    constructor() {}
}

export const CameraModeEnum = {
    showMap: "showMap",
    showPlayer: "showPlayer",
    showBot: "showBot"
}
