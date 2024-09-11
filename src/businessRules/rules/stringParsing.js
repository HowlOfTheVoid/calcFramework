/**
 * @file stringParsing.js
 * @module stringParsing
 * @description Contains all system-defined business rules for parsing strings with various operations.
 * @requires module:configurator
 * @requires module:arrayParsing
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

let arrayParsing = require('./rules/arrayParsing');
let stringParsing = require('../../executrix/configurator');
let D = require('../structures/data');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `businessRules.rules.${baseFileName}.`

/**
 * @function parseSystemRootPath
 * @description Parses the root path as returned by calling 'path.resolve(__dirname);
 *   Looks for the "AppName" part of the path, and parses that out to determine where
 *   on hard drive this folder is installed.
 * @NOTE The "AppName" is derived from cinfiguration settings called "applicationName",
 *   which should've been set by the system when it was loaded.
 * @param {string} inputData Root path defined by calling path.resolve(__dirname)
 * @param {string} inputMetaData Name of the application
 * @returns {string} The string with path up to the applciation folder, wherever installed.
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
export const parseSystemRootPath = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = replaceCharacterWithCharacter.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}.`);

    let returnData;
    if (inputData) {
        let applicationName = inputMetaData;

        let pathElements = inputData.split('\\');
        loop1:
        for (let i = 0; i < pathElements.length; i++) {
            console.log(`Begin iteration ${i}.`);
            let pathElement = pathElements[i];
            console.log(`Path Element is: ${pathElement}`);
            if (i === 0) {
                console.log(`Case: i === 0`);
                resolvedPath = pathElement;
            } else if (pathElement === applicationName) {
                console.log(`case: pathElement === applicationName`);
                resolvedPath = resolvedPath + '\\' + pathElement + '\\';
                break loop1;
            } else {
                console.log(`case else`);
                resolvedPath = resolvedPath + '\\' + pathElement;
            }
        }
    } // End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;

}
