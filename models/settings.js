export class Settings {
    uiFps = 60
    engineFps = 30
    networkFps = 10 // assume we will have 1 event per 200ms from server
    mapSize = 4000
    maxAsteroids = 400
    maxAsteroidsSameTime = 10
    spawnAsteroidPerSecond = 1
    botsAmount = 0
    tickerTimeLimitSec = 0 //(0 is infinity) after sec ticker will stop

    networkAddress = "ws://192.168.0.108:8080"
    eventsPerTick = 10 // how many events we consume per tick. if buffer contains more than 1

    dynamicSettings = new DynamicSettings()

    constructor() {}
}

export const CameraModeEnum = {
    showMap: "showMap",
    showPlayer: "showPlayer",
    showBot: "showBot"
}

export class DynamicSettings {
    networkMode = NetworkMode.local
    cameraMode = CameraModeEnum.showPlayer
}

export const NetworkMode = {
    local: "Local",
    online: "Online"
}
