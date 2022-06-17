import { Scene } from "../../models/scene"
import { done } from "./test-assertion";

export class CollisionTest {
    constructor() { }
    getTests() {
        return {
            // "CollisionEngine should":
            // {"tick 3 times and stop by calling clearInterval": () => {
            //     function createPlanet(botName) {
            //         let position = context.random.getVectorSquare(50, scene.mapSize - 50)
            //         let planetView = new PlanetView(0, 0, 100, botName, '0x6699ff', gameplay);
            //         let planet = new Planet(planetView, scene, null, 'planet1');
            //         planet.moveToPosition(position)
            //         planet.level = 2
            //         planet.applyLevelStats()

            //         let position = context.random.getVectorSquare(50, scene.mapSize - 50)
            //         let planetView = new PlanetView(0, 0, 100, botName, '0x6699ff', gameplay);
            //         let planet = new Planet(planetView, scene, null, 'planet2');
            //         planet.moveToPosition(position)
            //         planet.level = 3
            //         planet.applyLevelStats()

            //         collision.checkLevelCollision()

            //         scene.getPlanetByName "planet1" == null
                   
            //     }
            //     return done();
            // },
            "collision test should":
            {"xxxxx": () => {
                let scene = new Scene(50)
                console.log(scene);   
            }
            }              
        }
    }
}

