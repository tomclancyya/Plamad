import { TestEngine } from "./test-engine/test-engine.js";
import { InputTest } from "./input/input-test.js";
import { EventManagerTest } from "./utils/event-manager-test.js";
import { Vector2Test } from "./utils/vector2-test.js";
import { SceneTest } from "./models/scene-test.js";
import { BotTest } from "./models/bot-test.js";
import { MathTest } from "./utils/math-test.js";
import { TimerTest } from "./utils/timer-test.js";
import { RandomTest } from "./utils/random-test.js";
import { TickerTest } from "./test-engine/ticker-test.js";
import { AsyncTest } from "./other/async-test.js";
import { CameraTest } from "./models/camera-test.js";

console.log('')
console.log('\x1b[36m%s\x1b[0m', 'Running test');  //cyan

let testEngine = new TestEngine()

testEngine.add(new AsyncTest())
testEngine.add(new MathTest())
testEngine.add(new BotTest())
testEngine.add(new SceneTest())
testEngine.add(new Vector2Test()) 
testEngine.add(new InputTest())
testEngine.add(new EventManagerTest())
testEngine.add(new RandomTest())
testEngine.add(new TimerTest())
testEngine.add(new TickerTest())
testEngine.add(new CameraTest())

testEngine.runAll()