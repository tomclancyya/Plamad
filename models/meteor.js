import { CommonView } from "../ui/common/common-view";
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
     * @type {CommonView}
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
    * @param {CommonView} view  
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
        this.view.updatePosition(this.transform.position)
    }



    delete() {
        //ебанный костыль. проблема в том, что если удалить объект здесь, то в списке коллайд движка он все еще существует. 
        // пока коллайд движок не пройдется по всем элементам.
        //поэтому добавил isActive чтобы проверять не удалился ли объект
        if (this.isActive()) {        
            this.view.delete();
            this.view = null;
            // TODO: move this to scene, to remove sircular dependency
            this.scene.deleteMeteor(this)
        }
    }
}