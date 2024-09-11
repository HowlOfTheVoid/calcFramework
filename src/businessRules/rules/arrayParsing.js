/**
 * @file arrayParsing.js
 * @module arrayParsing
 * @description Contains all system-defined business rules for parsing arrays with various operations.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */


let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `businessRules.rules.${baseFileName}.`

/**
 * @function replaceCharacterWithCharacter
 * @description Replaces all instances of the specified character with another specified character.
 * @param {string} inputData A string that may or may not contain specified character to be converted.
 * @param {array<string, string>} inputMetaData An array of data with two string parameters.
 * inputMetaData[0] => Character to find
 * inputMetaData[1] => Character to replace
 * @returns {string} The input data string, with the instances of the found character replaced by the replacing character.
 */ 
export const replaceCharacterWithCharacter = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = replaceCharacterWithCharacter.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}.`);

    let returnData;
    let character2Find = inputMetaData[0];
    let character2Replace = inputMetaData[1];
    if (!inputData && !character2Find && !character2Replace) {
        returnData = false;
    } else {
        returnData = inputData.replace(character2Find, character2Replace);
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;

};
