const args = process.argv;
let env = args[2]


import escape from 'escape-string-regexp';
import shell from 'shelljs';

let testDisabled = ('/*[test]*///')
let testEnabled = ('/*[test]*/')
let productionDisabled = ('/*[production]*///')
let productionEnabled = ('/*[production]*/')

if (env == 'test')
    enableImportForTest()

if (env == 'production')
    enableImportForProduction()


function enableImportForTest() {
    forEachJsFilesDo((file) => {
        shell.sed('-i', escape(testDisabled), testEnabled, file)
        shell.sed('-i', escape(productionEnabled), productionDisabled, file)
    })
}

function enableImportForProduction() {
    forEachJsFilesDo((file) => {
        shell.sed('-i', escape(productionDisabled), productionEnabled, file)
        shell.sed('-i', escape(testEnabled), testDisabled, file)
    });
}


function forEachJsFilesDo(callback) {
    shell.find('./').filter(f => !(f.includes('node_modules.nosync')
        || f.includes('.git/')
        || f.includes('test/')
        || f.includes('.json')
        || f.includes('mini.js'))
        && f.includes('.js')
        && f.includes('common-view.js')
    ).forEach(function (file) {
        callback(file)
    });
}