
export class TestEngine {

    constructor() {
    }

     /**
     *  @type {TestDescription[]}
     */
    testDescriptions = []
    testsTotal = 0
    testsError = 0
    testsSuccess = 0
    testsSkip = 0

    convertToArrayAsArray(tests) {
        let testDescription = tests;

        let convertedTesAsArrayOfArrays = []
        for (let i = 0; i < testDescription.length; i = i+ 2) {
            let name = testDescription[i]
            let cases = testDescription[i+1]
            let testArray = [name, cases]
            convertedTesAsArrayOfArrays.push(testArray)
        }

        convertedTesAsArrayOfArrays.map((subject) => {
                let convertedTestCaseAsArrayOFArrays = []
                for (let i = 0; i < subject[1].length; i = i+ 2) {
                    let name = subject[1][i]
                    let func = subject[1][i+1]
                    let testCaseArray = [name, func]
                    convertedTestCaseAsArrayOFArrays.push(testCaseArray)
                }

                subject[1] = convertedTestCaseAsArrayOFArrays
            })
        return convertedTesAsArrayOfArrays    
    }

    convertToArrayAsObject(tests) {

        let testCases = tests.getTests();

        let convertedTesAsArrayOfArrays = []
        Object.entries(testCases).map((subject) => {
            convertedTesAsArrayOfArrays.push([subject[0], subject[1]])
        })

        convertedTesAsArrayOfArrays.map((subject) => {
            let convertedTestCaseAsArrayOFArrays = []
            
            Object.entries((subject[1])).map((testCase) => {
                convertedTestCaseAsArrayOFArrays.push([testCase[0],testCase[1]])
            })

            subject[1] = convertedTestCaseAsArrayOFArrays
        })

        return convertedTesAsArrayOfArrays
    }

    add(tests) {
        let testCases = null
        if (Array.isArray(tests)) {
            testCases = this.convertToArrayAsArray(tests);
        } else {
            testCases = this.convertToArrayAsObject(tests);
        }

        testCases.map((subject) => {
            let testDescription = new TestDescription()
            let isSkipDescription = subject[0].includes('.skip')
            let isOnlyDescription = subject[0].includes('.only')
            testDescription.testDescription = subject[0]
            testDescription.isSkip = isSkipDescription
            testDescription.isOnly = isOnlyDescription;

                ((subject[1])).map((testCase) => {   
                    let isSkip = testCase[0].includes('.skip')
                    let isOnly = testCase[0].includes('.only')
                    
                    let testCaseFunc = testCase[1]
                    let f = new FuncInfo()
                    f.func = testCaseFunc
                    f.testDescription = subject[0]
                    f.testCase = testCase[0]
                    f.isSkip = isSkip
                    f.isOnly = isOnly
                    testDescription.testCases.push(f)
                })

            this.testDescriptions.push(testDescription)                
        })
    }

    /**
     * @private
     */
    updateTestsIsSkipStatesAccordingToDescriptions() {
        let onlyDescriptions = this.testDescriptions.filter(t => t.isOnly)
        if (onlyDescriptions.length > 0) {
            let descriptionsToSkip = this.testDescriptions.filter(t => !t.isOnly)
            descriptionsToSkip.map(d => d.isSkip = true)
        }

        //set tests as skip is desc is skip
        this.testDescriptions.map(d => {
            if (d.isSkip) {
                d.testCases.map(t => {
                    t.isSkip = true
                })
            }
        })
    }
    /**
     * 
     * @returns @private
     */
    checkForDuplicates() {
        let descriptionNames = {}
        let testNames = {}
        this.testDescriptions.map(d => {
            if (!descriptionNames[d.testDescription])  { descriptionNames[d.testDescription] = 1 } else { descriptionNames[d.testDescription]++ }
            d.testCases.map(t => {
                if (!testNames[t.testCase])  { testNames[t.testCase] = 1 } else { testNames[t.testCase]++ }
            })
        })

        for (var key of Object.keys(descriptionNames)) {
            if (descriptionNames[key] > 1) {
                return "found duplicate of test case, check the name:\n\n" + key
            }
        }

        for (var key of Object.keys(testNames)) {
            if (testNames[key] > 1) {
                return "found duplicate of test description, check the name:\n\n" + key
            }
        }
    }
    /**
     * @private
     */
    updateTestsIsSkipStateAccordingToTestCases() {
        this.testDescriptions.map(d => { 
            let testsOnly = d.testCases.filter(t => t.isOnly)
            if (testsOnly.length > 0) {
                let testsToSkip = d.testCases.filter(t => !t.isOnly)
                testsToSkip.map(d => d.isSkip = true)
            }
        })
    }
    /**
     * @private
     */
    getTestsTotal() {
        let tests = 0
        this.testDescriptions.map(d => d.testCases.map(t => { 
            tests++ 
        }))
        return tests
    }
    /**
     * @private
     */
    getTestsSkip() {
        let tests = 0
        this.testDescriptions.map(d => d.testCases.map(t => { 
            if (t.isSkip)
                tests++ 
        }))

        return tests
    }

    runAll() {
        if (this.checkForDuplicates()) {
            console.log("\x1b[31m", `Cannot run tests`)
            console.log(this.checkForDuplicates())
            console.log('')
            return;
        }

        this.updateTestsIsSkipStatesAccordingToDescriptions()
        this.updateTestsIsSkipStateAccordingToTestCases()
        this.testsTotal = this.getTestsTotal()
        this.testsSkip = this.getTestsSkip()
        this.runEachTests().then((result) => {
            console.log('\nTest results')
                          console.log(` Total tests  : ${this.getTestsTotal()}`)

            if (this.testsSuccess > 0)
                console.log("\x1b[32m", `Success tests: ${this.testsSuccess} `)
            if (this.testsError > 0)
                console.log("\x1b[31m", `Failed tests : ${this.testsError}`)
                if (this.testsSkip > 0)                
                console.log("\x1b[33m", `Skipped tests: ${this.testsSkip}`)
            //console.log(result)
        });
    }

    /**
     * @private
     */
    async runEachTests() {
        for (const desc of this.testDescriptions) {            
            if (desc.isSkip) {
                //console.log('\x1b[33m', '' + 'SKIP', '\x1b[0m');
            } else {

                process.stdout.write('\n      ' + desc.testDescription + '\r');
                console.log('')
                for (const test of desc.testCases) {
                    process.stdout.write('        ' + test.testCase + '\r');

                    if (test.isSkip){
                        console.log('\x1b[33m', '  ' + 'SKIP', '\x1b[0m');
                    } else {
                        try {
                            let testResult = await test.func();
                            console.log(testResult.color, '    ' + testResult.result, '\x1b[0m');
                            this.testsSuccess++;
                        } catch (testFailResult) {
                            this.testsError++;
                            //console.log('')
                            if (testFailResult.result) {
                                console.log(testFailResult.color, '  ' + 'FAIL', '\x1b[0m');
                                console.log('')
                                console.log(testFailResult.color, '    ' + testFailResult.message, '\x1b[0m');
                            } else {
                                console.log(testFailResult, '\x1b[0m');
                            }
                            console.log('')
                        }
                    }
                }
            }

           
        }
    }
}

class TestDescription {
    testDescription = "no description"
    isOnly = false
    isSkip = false
    /**
     *  @type {FuncInfo[]}
     */
    testCases = []
}

class FuncInfo {
    constructor() {}
    func = null
    testDescription = "no description"
    testCase = "no case name"
    isSkip = false
    isOnly = false
}