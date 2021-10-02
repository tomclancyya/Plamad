import { Vector2 } from "../utils/vector2";
import { Meteor } from "./meteor";


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

    constructor(mapSize, randomizer) {
        this.mapSize = mapSize;
    }

    getPlanets() {
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
