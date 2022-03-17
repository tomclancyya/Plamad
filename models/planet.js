import { Container } from 'pixi.js';
import { Transform } from './transform'
import { Scene } from './scene';
import { levels } from './planet-level';

export class Planet {
    /** 
     * @type {Transform}
     * @public
     */
    transform = null

    /** 
     * @type {Container}
     * @public
     */
    view = null;


    /** 
     * @type {Scene}
     * @public
     */
    scene = null;

    input = null;

    name = null;

    score = 0;

    level = 1;

    exp = 0;

    isActive = false;

    /** 
    * @param {Scene} scene  
    */
    constructor(view, scene, fps, name){
        this.view = view
        this.scene = scene 
        this.transform = new Transform(scene.mapSize);
        this.name = name;
        this.isActive = true;
        scene.addPlanet(this)

        this.applyLevelStats()
    }

    moveToPosition(position){
        this.transform.moveToPosition(position);   
    }

    moveByVector(delta, input) {
        if (!this.isActive) 
            return false;

        let speed = levels.find(l => l.level == this.level).speed
        let direction = input.multiValue(delta * speed);
        this.transform.move(direction);   
        
    }

    render() {
        this.view.container.position.x = this.transform.position.x
        this.view.container.position.y = this.transform.position.y
    }

    onCollideMeteor(meteor){
        if (!this.isActive)
            return false;

        if (this.transform.isCollide(meteor.transform)){
            meteor.delete();
            this.score++;
            this.exp++;
        }
    }
    /**
     * 
     * @param {Planet} planet 
     */
    onCollidePlanet(planet){
        if (!this.isActive || !planet.isActive)
            return false;

        if (this.transform.isCollide(planet.transform)){
            let newExp = 2
            if (this.level > planet.level){
                this.score += newExp
                this.exp += newExp
                planet.delete()
            } else if (this.level < planet.level) {
                planet.score += newExp
                planet.exp += newExp
                this.delete()
            } 
        }

        
        // do somethong
    }

    delete() {
        this.view.setGrayColor();
        this.isActive = false;
        //this.view.delete();
        //this.view = null;
        //this.scene.deletePlanet(this)
    }

    getLevelStat() {
        return  levels.find(l => l.level == this.level)
    }

    checkForLevelUp(){
        let expForLevelUp = levels.find(l => l.level == this.level).expForLevelUp
        let currentExp = this.exp
        if (expForLevelUp && expForLevelUp <= currentExp) {
            this.exp = 0
            this.level = this.level + 1;
            this.applyLevelStats()
        }
    }

    applyLevelStats() {
        let levelStats = levels.find(l => l.level == this.level)
        this.transform.setSize(levelStats.size)
        this.view.setSize(levelStats.size)
    }

    tick() {        
        this.render();   
    }

    networkTick() {
        this.checkForLevelUp()
    }
}