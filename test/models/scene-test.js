import { Meteor } from "../../models/meteor";
import { Scene } from "../../models/scene";
import { CommonView } from "../../ui/common/common-view";
import { Vector2 } from "../../utils/vector2";
import { done, isBooleanEqual, isNumberEqual, isVector2Equal } from "../test-engine/test-assertion";


export class SceneTest {
    constructor(){
        
    }
    getTests() {
        return {
            "scene test should":
            {
                "find closest meteor": () => {
                    let scene = new Scene(1000)

                    let meteor1 = new Meteor(new TestView(), scene, new Vector2(500,500))
                    let meteor2 = new Meteor(new TestView(), scene, new Vector2(600,600))
                    let meteor3 = new Meteor(new TestView(), scene, new Vector2(700,700))
                    scene.meteors = [
                        meteor2, meteor1, meteor3
                    ]
                    let myPositionCloseToMeteor1 = new Vector2(500,500)
                    let myPositionCloseToMeteor2 = new Vector2(600,600)
                    let myPositionCloseToMeteor3 = new Vector2(700,700)
                    let myPositionCloseToNobody = new Vector2(7000,7000)
                    isBooleanEqual(scene.getClosestMeteor(myPositionCloseToMeteor1, 1000), meteor1)
                    isBooleanEqual(scene.getClosestMeteor(myPositionCloseToMeteor2, 1000), meteor2)
                    isBooleanEqual(scene.getClosestMeteor(myPositionCloseToMeteor3, 1000), meteor3)
                    isBooleanEqual(scene.getClosestMeteor(myPositionCloseToNobody, 1000), null)

                    return done();
                }
            }
        }
    }
}

class TestView extends CommonView{
    constructor() {
        let container = { position: new Vector2(0,0)}
        super(container)
    }
}