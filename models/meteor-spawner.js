import { Container } from "pixi.js";
import { Random } from "../engine/random";
import { Ticker } from "../engine/ticker";
import { MeteorView } from "../ui/meteor-view";
import { Timer } from "../utils/timer";
import { GameContext } from "./game-context";
import { Meteor } from "./meteor";
import { Scene } from "./scene";


export class MeteorSpawner {

    spawnedAmount = 0

    /**
     * @param {GameContext} context 
     * @param {Random} random 
     * @param {Scene} scene 
     * @param {Container} pixiStage 
     * @param {number} maxAmount 
     * @param {number} spawnPerSecond 
     * @param {typeof MeteorView} meteorViewClass - will move MeteorView class reference upper
     */
    constructor(context, scene){
        this.timer = new Timer(context.settings.spawnAsteroidPerSecond);
        this.scene = scene;
        this.random = context.random;
        this.maxAsteroids = context.settings.maxAsteroids;
        this.maxAsteroidsSameTime = context.settings.maxAsteroidsSameTime;
        this.pixiStage = context.app.stage;
        this.spawnedAmount = 0
    }

    networkUpdate(delta){
        this.timer.update(delta)
        if (this.timer.isFinished()){
            let amountAsteroidsInScene = this.scene.getMeteors().length
            if (amountAsteroidsInScene < this.maxAsteroidsSameTime && this.spawnedAmount < this.maxAsteroids){
                let meteorView = new MeteorView(0, 0, 50, '0xcc6600', this.pixiStage)
                let position = this.random.getVectorSquare(0, this.scene.mapSize)
                new Meteor(meteorView, this.scene, position);
                this.spawnedAmount++;
                this.timer.reset();
            }  
        }
    }

    allMeteorsWasDestroyed(){
        return (this.spawnedAmount == this.maxAsteroids && this.scene.getMeteors().length == 0)
    }
}