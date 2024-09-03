/**
 * @file testHarness.js
 * @module testHarness
 * @description This is the main init for the test application. 
 *     Contains main program loop and basic argument parsing to test the framework.
 * @requires {@link https://www.npmjs.com/package/package/prompt-sync|prompt-sync}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 8/26/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

import calcFramework from '../src/main.js';
const prompt = require(`prompt-sync`)();
let path = require(`path`);
global.appRoot = path.resolve(process.cwd());
let rootPath = ``;
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `${baseFileName}.`

/**
 * @function bootstrapApplication
 * @description Setup all test applications data and configuration settings.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function bootstrapApplication() {
    // Set function name, log beginning of function.
    let functionName = bootstrapApplication.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);

    rootPath = path.resolve(process.cwd());
    let appConfig = {
        "applicationName": "testHarness",
        "rootPath": rootPath,
        "appConfigReference": "//test//resources//configuration//"
    };
    calcFramework.initFramework(appConfig);

    console.log(`End: ${namespacePrefix}${functionName} function.`);
};

/**
 * @function application
 * @description The main program loop - Init for the test application.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function application() {
    // Set function name, log beginning of function.
    let functionName = application.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);

    let argumentDrivenInterface = false;
    let commandInput;
    let commandResult;

    if (argumentDrivenInterface === false) {
        // console.log(`Begin Main program loop`);
        // console.log(`Begin command parser:`);

        while (programRunning === true) {
            commandInput = prompt(`>`);
            console.log(`Command Input is: ${commandInput}`)
            if (commandInput.toUpperCase() == 'EXIT') {
                console.log(`End command parser!`);
                programRunning = false;
                console.log(`End Main program loop`);
                console.log(`Exiting Test Harness.`);
            }
        }
    }

    // console.log(`End: ${namespacePrefix}${functionName} function.`);
}

// Launch the Test Application
var programRunning = false;
bootstrapApplication();
programRunning = true;
application();