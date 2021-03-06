import { Meteor } from "../models/meteor";
import { Planet } from "../models/planet"
import { Scene } from "../models/scene";

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
    constructor(scene) {
        this.scene = scene
    }

    checkPlanetsCollision() {
        let planets = this.getPlanets()
        for (let i = 0; i < planets.length; i++) {
            for (let j = i + 1; j < planets.length; j++) {
                let planet1 = planets[i];
                let planet2 = planets[j];
                if (planet1 == planet2)
                    continue;

                planet1.checkPlanetCollision(planet2);
            }
        }
    }

    checkPlanetsWithMeteorsCollision() {
        let planets = this.getPlanets()
        let meteors = this.getMeteors()
        planets.map(planet => meteors.map(meteor => planet.checkMeteorCollision(meteor)))
    }
}