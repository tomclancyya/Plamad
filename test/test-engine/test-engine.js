export class TestEngine {

    executedLastTest = false
    constructor() {
    }


    runTest(tests, lastTest = false) {
        if (this.executedLastTest) {
            return;
        }

        let testCases = tests.getTests();
        Object.entries(testCases).map((subject) => {
            console.log('  ' + subject[0]);
            Object.entries((subject[1])).map((testCase) => {
                process.stdout.write('        ' + testCase[0] + '\r');
                try {
                    let testResult = testCase[1]()
                    console.log(testResult.color, '    ' + testResult.result, '\x1b[0m');
                } catch (testFailResult) {
                    console.log(testFailResult.color, '    ' + testFailResult.result, '\x1b[0m');
                    console.log(testFailResult.color, '    ' + testFailResult.message, '\x1b[0m');
                }
            })
        })

        if (lastTest) {
            this.executedLastTest = true;
            console.log('  ' + 'latest test was executed');
        }

    }
}