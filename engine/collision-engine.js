import { GameContext } from "../models/game-context";
import { Meteor } from "../models/meteor";
import { Planet } from "../models/planet"
import { Scene } from "../models/scene";
import { Ticker } from "./ticker";

export class CollisionEngine {

    /** 
    * @type {Scene}
    * @public
    */
    scene;


    /** 
     * @return {Planet[]}
     * @public
     */
    getPlanets() {
        return this.scene.getPlanets();
    }
    /** 
     * @type {Meteor[]}
     * @public
     */
    getMeteors() {
        return this.scene.getMeteors();
    }
    /** 
    * @param {Scene} scene  
    */
    constructor(scene, fps) {
        this.scene = scene
    }

    isPlanetCollidesPlanet() {
        let planets = this.getPlanets()
        // we are using multiplications because it's faster than calling Math.pow
        for (let i = 0; i < planets.length; i++) {
            for (let j = 0; j < planets.length; j++) {
                let planet1 = planets[i];
                let planet2 = planets[j];
                if (planet1 == planet2)
                    continue;

                planet1.onCollidePlanet(planet2);
            }
        }
    }

    isPlanetCollidesMeteor() {

        let planets = this.getPlanets()
        let meteors = this.getMeteors()
        planets.map(planet => meteors.map(meteor => planet.onCollideMeteor(meteor)))
    }
}