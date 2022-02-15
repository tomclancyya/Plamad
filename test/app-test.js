import { TestEngine } from "./test-engine/test-engine.js";
import { InputTest } from "./input/input-test.js";
import { EventManagerTest } from "./utils/event-manager-test.js";
import { Vector2Test } from "./utils/vector2-test.js";
import { SceneTest } from "./models/scene-test.js";
import { BotTest } from "./models/bot-test.js";

console.log('')
console.log('\x1b[36m%s\x1b[0m', 'Running test');  //cyan

let testEngine = new TestEngine()
testEngine.runTest(new BotTest())
testEngine.runTest(new SceneTest())
testEngine.runTest(new Vector2Test())
testEngine.runTest(new InputTest())
testEngine.runTest(new EventManagerTest())