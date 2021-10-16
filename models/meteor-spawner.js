import { Container } from "pixi.js";
import { Random } from "../engine/random";
import { Ticker } from "../engine/ticker";
import { MeteorView } from "../ui/meteor-view";
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
        new Ticker(spawnPerSecond, (delta) => {
            if (scene.getMeteors().length < maxAmount){
                let meteorView = new MeteorView(0, 0, 50, '0xcc6600', pixiStage)
                let position = random.getVectorSquare(0, scene.mapSize)
                new Meteor(meteorView, scene, position);
            }
        })
    }
}