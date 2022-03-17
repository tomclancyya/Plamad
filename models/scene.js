import { Vector2 } from "../utils/vector2";
import { Meteor } from "./meteor";
import { Planet } from "./planet";



// store current objects in scene
// and store scene settings: size, static objects
export class Scene {

    /** 
     * @type {Planet[]}
     * @public
     */
    planets = []
    /** 
   * @type {Meteor[]}
   * @public
   */
    meteors = []
    /** 
     * @type {number}
     * @public 
     */
    mapSize;

    removedObjects = []

    constructor(mapSize, randomizer) {
        this.mapSize = mapSize;
    }

    getObjects() {        
        return this.planets.concat(this.meteors)
    }

    getPlanets() {
        // exclude removed objects
        return this.planets;
    }

    getMeteors() {
        return this.meteors;
    }

    addPlanet(newPlanet) {
        this.planets.push(newPlanet);
    }

    addMeteor(newMeteor) {
        this.meteors.push(newMeteor);
    }

    deletePlanet(planet) {
        this.planets = this.planets.filter(p => p != planet);
    }

    deleteMeteor(meteor) {
        this.meteors = this.meteors.filter(m => m != meteor);
    }

    getRandomPoint() {

    }

    /**
     * 
     * @param {Vector2} myPosition 
     * @param {number} searchRadius 
     */
    getClosestMeteor(myPosition, searchRadius) {

        let meteorsWithDistanceToYou = this.meteors.map(meteor => { return { 
            distance: meteor.transform.getDistance(myPosition), meteor: meteor 
        } })
        let meteorsInsideRadius = meteorsWithDistanceToYou.filter(meteorDistance => { return meteorDistance.distance < searchRadius })

        if (meteorsInsideRadius.length == 0)
            return null;

        return meteorsInsideRadius.reduce(function (closestMeteor, currentMeteor) {
            if (currentMeteor.distance < closestMeteor.distance)
                return currentMeteor
            else
                return closestMeteor

        }, meteorsInsideRadius[0]).meteor

    }
}
