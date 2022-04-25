export class Settings {
    uiFps = 60
    engineFps = 30
    mapSize = 4000
    maxAsteroids = 400
    maxAsteroidsSameTime = 10
    spawnAsteroidPerSecond = 1
    botsAmount = 10
    tickerTimeLimitSec = 0 //(0 is infinity) after sec ticker will stop

    networkAddress = "ws://localhost:8080"

    dynamicSettings = new DynamicSettings()

    constructor() {}
}

export const CameraModeEnum = {
    showMap: "showMap",
    showPlayer: "showPlayer",
    showBot: "showBot"
}

export class DynamicSettings {
    networkMode = NetworkMode.online
    cameraMode = CameraModeEnum.showPlayer
}

export const NetworkMode = {
    local: "Local",
    online: "Online"
}
