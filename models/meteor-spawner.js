import { Container } from "pixi.js";
import { Random } from "../engine/random";
import { Ticker } from "../engine/ticker";
import { MeteorView } from "../ui/meteor-view";
import { Timer } from "../utils/timer";
import { Meteor } from "./meteor";
import { Scene } from "./scene";


export class MeteorSpawner {

    /**
     * 
     * @param {Random} random 
     * @param {Scene} scene 
     * @param {Container} pixiStage 
     * @param {number} maxAmount 
     * @param {number} spawnPerSecond 
     * @param {typeof MeteorView} meteorViewClass - will move MeteorView class reference upper
     */
    constructor(random, scene, pixiStage, maxAmount, spawnPerSecond, meteorViewClass){
        this.timer = new Timer(spawnPerSecond);
        this.scene = scene;
        this.random = random;
        this.maxAmount = maxAmount;
        this.pixiStage = pixiStage;
    }

    networkUpdate(delta){
        this.timer.update(delta)
        if (this.timer.isFinished()){
            if (this.scene.getMeteors().length < this.maxAmount){
                let meteorView = new MeteorView(0, 0, 50, '0xcc6600', this.pixiStage)
                let position = this.random.getVectorSquare(0, this.scene.mapSize)
                new Meteor(meteorView, this.scene, position);
                this.timer.reset();
            }  
        }
    }
}