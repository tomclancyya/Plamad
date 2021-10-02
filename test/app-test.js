
import { InputTest } from "./input-test.js";
import { SceneTest } from "./models/scene-test.js";
import { TestEngine } from "./test-engine.js";
import { EventManagerTest } from "./utils/event-manager-test.js";
import { Vector2Test } from "./vector2-test.js";




import shell from 'shelljs';
//shell.find()
shell.find('./').filter(f => !(f.includes('node_modules.nosync')
    || f.includes('.git/')
    || f.includes('test/')
    || f.includes('.json')
    || f.includes('mini.js'))
    && f.includes('.js')
).forEach(function (file) {
    let s = /[test]/
    shell.sed('-i','[test]', 'hello', file) 
});


/*
console.log('')
console.log('\x1b[36m%s\x1b[0m', 'Running test');  //cyan

let testEngine = new TestEngine()
testEngine.runTest(new SceneTest())
testEngine.runTest(new Vector2Test())
testEngine.runTest(new InputTest())
testEngine.runTest(new EventManagerTest())
*/