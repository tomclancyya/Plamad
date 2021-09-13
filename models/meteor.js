import { Vector2 } from "../utils/vector2";
import { GameContext } from "./game-context";
import { Scene } from "./scene";
import { Transform } from "./transform";

export class Meteor {
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

    /** 
    * @param {GameContext} context  
    * @param {Container} view  
    * @param {Scene} scene  
    * @param {Vector2} position  
    */
    constructor(view, scene, position){
        this.view = view
        this.scene = scene;
        this.transform = new Transform(scene.mapSize);
        this.scene.addMeteor(this)
        this.transform.move(position)
        this.render();
        
    }

    isActive() {
        return this.view != null
    }


    render() {
        this.view.position.x = this.transform.position.x
        this.view.position.y = this.transform.position.y
    }



    delete() {
        if (this.isActive()) {        
            this.view.destroy();
            this.view = null;
            this.scene.deleteMeteor(this)
        }
    }
}