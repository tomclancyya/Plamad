import { CollisionEngine } from "../../engine/collision-engine";
import { Meteor } from "../../models/meteor";
import { Planet } from "../../models/planet";
import { Scene } from "../../models/scene"
import { MeteorView } from "../../ui/meteor-view";
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
                let collisionPoint = new Vector2 (50, 50)
                let planetView = {
                    setSize: function(){},
                    setGrayColor: function(){}       
                }                             
                let planet1 = new Planet (planetView, scene, null, 'planet1');
                planet1.moveToPosition(collisionPoint)
                planet1.level = 1
                planet1.applyLevelStats()                
                   
                let planet2 = new Planet (planetView, scene, null, 'planet2');
                planet2.moveToPosition(collisionPoint)
                planet2.level = 3
                planet2.applyLevelStats()        
                
                // let smallest = null
                // if (planet1.transform.size < planet2.transform.size) {
                //     smallest = planet1
                //   } else {
                //     smallest = planet2
                //   } 
                  
                isBooleanEqual(planet1.isActive, true);   
                isBooleanEqual(planet2.isActive, true);   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                isBooleanEqual(planet1.isActive, false);   
                return isBooleanEqual(planet2.isActive, true);                   
            },
            "should not delete any planet when the same planets have meet": () => {                                                
                let scene = new Scene (1000)
                let collisionPoint = new Vector2 (50, 50)
                let planetView = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }                   

                let planet1 = new Planet (planetView, scene, null, 'planet1');
                planet1.moveToPosition(collisionPoint)
                planet1.level = 1
                planet1.applyLevelStats()                                
                
                let planet2 = new Planet (planetView, scene, null, 'planet2');
                planet2.moveToPosition(collisionPoint)
                planet2.level = 1
                planet2.applyLevelStats() 
                
                let planet3 = new Planet (planetView, scene, null, 'planet2');
                planet3.moveToPosition(collisionPoint)
                planet3.level = 1
                planet3.applyLevelStats()  
                  
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)   
                isBooleanEqual(planet3.isActive, true)   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)   
                return isBooleanEqual(planet3.isActive, true)                  
            },
            "should delete the smaller planet of two that met but not the smallest on the scene": () => {                                                
                let scene = new Scene (1000)
                let collisionPoint = new Vector2 (50, 50)
                let remotePosition = new Vector2 (550, 550)
                
                let planetView = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }                             
                let planet1 = new Planet (planetView, scene, null, 'smallest');
                planet1.moveToPosition(remotePosition)
                planet1.level = 1
                planet1.applyLevelStats()

                let planet2 = new Planet (planetView, scene, null, 'smaller');
                planet2.moveToPosition(collisionPoint)
                planet2.level = 2
                planet2.applyLevelStats()                                    
                                             
                let planet3 = new Planet (planetView, scene, null, 'biggest');
                planet3.moveToPosition(collisionPoint)
                planet3.level = 3
                planet3.applyLevelStats() 
                
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)
                isBooleanEqual(planet3.isActive, true)   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, false)
                return isBooleanEqual(planet3.isActive, true)                              
            },
            "should not delete any planet when different planets have not meet": () => {                                                
                let scene = new Scene (1000)
                
                let planetView = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }                           
                
                let position1 = new Vector2 (0, 0)
                let planet1 = new Planet (planetView, scene, null, 'smallest');
                planet1.moveToPosition(position1)
                planet1.level = 1
                planet1.applyLevelStats()

                let position2 = new Vector2 (200, 200)
                let planet2 = new Planet (planetView, scene, null, 'smaller');
                planet2.moveToPosition(position2)
                planet2.level = 2
                planet2.applyLevelStats()    
                
                let position3 = new Vector2 (1000, 1000)
                let planet3 = new Planet (planetView, scene, null, 'biggest');
                planet3.moveToPosition(position3)
                planet3.level = 3
                planet3.applyLevelStats() 
                
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)
                isBooleanEqual(planet3.isActive, true)   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)
                return isBooleanEqual(planet3.isActive, true)                              
            },
            "should delete two smaller planets and left the biggest one when three planets have meet": () => {                                                
                let scene = new Scene (1000)
                let collisionPoint = new Vector2 (100, 100)
                let planetView = {
                    setSize: function(){},
                    setGrayColor: function(){}
                }                             

                let planet1 = new Planet (planetView, scene, null, 'smallest');
                planet1.moveToPosition(collisionPoint)
                planet1.level = 1
                planet1.applyLevelStats()
                
                let planet2 = new Planet (planetView, scene, null, 'smaller');
                planet2.moveToPosition(collisionPoint)
                planet2.level = 2
                planet2.applyLevelStats()                    
                
                let planet3 = new Planet (planetView, scene, null, 'biggest');
                planet3.moveToPosition(collisionPoint)
                planet3.level = 3
                planet3.applyLevelStats() 
                
                isBooleanEqual(planet1.isActive, true)
                isBooleanEqual(planet2.isActive, true)
                isBooleanEqual(planet3.isActive, true)   
               
                let collision = new CollisionEngine (scene)                     
                collision.checkPlanetsCollision ()      
                                
                isBooleanEqual(planet1.isActive, false)
                isBooleanEqual(planet2.isActive, false)
                return isBooleanEqual(planet3.isActive, true)                              
            },
            "meteor.only": () => {                                                
                let scene = new Scene (1000)
                let collisionPoint = new Vector2 (50, 50)
                let planetView = {
                    setSize: function(){},
                    setGrayColor: function(){}       
                }                             
                
                let planet = new Planet (planetView, scene, null, 'planet');
                planet.moveToPosition(collisionPoint)
                planet.level = 1
                planet.applyLevelStats()

                let MeteorView = {
                    updatePosition: function(){},
                    delete: function(){}                         
                }           
                let meteor = new Meteor(MeteorView, scene, collisionPoint)            
                
                isBooleanEqual(planet.isActive, true)
                isBooleanEqual(meteor.isActive(), true) 
                              
                let collision = new CollisionEngine (scene) 
                collision.checkPlanetsWithMeteorsCollision();

                isBooleanEqual(planet.isActive, true)
                return isBooleanEqual(meteor.isActive(), false)
            }

        }              
        }
    }
}

