import { CollisionEngine } from "../../engine/collision-engine";
import { Planet } from "../../models/planet";
import { Scene } from "../../models/scene"
import { PlanetView } from "../../ui/planet-view";
import { Vector2 } from "../../utils/vector2";
import { done, isBooleanEqual } from "./test-assertion";

export class CollisionTest {
    constructor() { }
    getTests() {
        return {
            "collision test should.only":
            {"should delete the smaller planet when different planets have meet": () => {                                
                let scene = new Scene (1000)

                let position1 = new Vector2 (50, 50)
                let planetView1 = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }// new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                let planet1 = new Planet (planetView1, scene, null, 'planet1');
                planet1.moveToPosition(position1)
                planet1.level = 2
                planet1.applyLevelStats()

                let position2 = new Vector2 (50, 50)
                let planetView2 = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }// new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                let planet2 = new Planet (planetView2, scene, null, 'planet2');
                planet2.moveToPosition(position2)
                planet2.level = 3
                planet2.applyLevelStats()
                                
                // let position2 = new Vector2 (50, 50)
                // console.log('')
                // console.log('')
                // console.log('')
                // console.log('planet1:')
                // console.log(planet1)
                // let planetView2 = new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                // let planet2 = new Planet (planetView2, scene2, null, 'planet2');
                // planet.moveToPosition(position2)
                // planet.level = 2
                // planet.applyLevelStats()

                let collision = new CollisionEngine (scene) 
                collision.checkPlanetsCollision ()

                return isBooleanEqual (scene.getPlanetsByNal)                
               
            }         
            }              
        }
    }
}

