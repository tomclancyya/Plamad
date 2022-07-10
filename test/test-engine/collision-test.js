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
                planet1.level = 1
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
                
                let smallest = null
                if (planet1.transform.size < planet2.transform.size) {
                    smallest = planet1
                  } else {
                    smallest = planet2
                  } 
                  
                isBooleanEqual(smallest.isActive, true);   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                return isBooleanEqual(smallest.isActive, false)   
            },
            "should not delete any planet when the same planets have meet": () => {                                                
                let scene = new Scene (1000)

                let position1 = new Vector2 (50, 50)
                let planetView1 = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }// new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                let planet1 = new Planet (planetView1, scene, null, 'planet1');
                planet1.moveToPosition(position1)
                planet1.level = 1
                planet1.applyLevelStats()

                let position2 = new Vector2 (50, 50)
                let planetView2 = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }// new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                let planet2 = new Planet (planetView2, scene, null, 'planet2');
                planet2.moveToPosition(position2)
                planet2.level = 1
                planet2.applyLevelStats()                                    
                  
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                isBooleanEqual(planet1.isActive, true)
                return isBooleanEqual(planet2.isActive, true)                  
            },
            "should not delete any planet when the same planets have meet": () => {                                                
                let scene = new Scene (1000)

                let position1 = new Vector2 (50, 50)
                let planetView1 = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }// new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                let planet1 = new Planet (planetView1, scene, null, 'planet1');
                planet1.moveToPosition(position1)
                planet1.level = 1
                planet1.applyLevelStats()

                let position2 = new Vector2 (50, 50)
                let planetView2 = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }// new PlanetView(0, 0, 100, 'text', '0x6699ff', 'gameplay');
                let planet2 = new Planet (planetView2, scene, null, 'planet2');
                planet2.moveToPosition(position2)
                planet2.level = 1
                planet2.applyLevelStats()                                    
                  
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                isBooleanEqual(planet1.isActive, true)
                return isBooleanEqual(planet2.isActive, true)                  
            }        
            
            }              
        }
    }
}

