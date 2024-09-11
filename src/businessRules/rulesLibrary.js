/**
 * @file rulesLibrary.js
 * @module rulesLibrary
 * @description Contains all of the system defined business rules as a map between function names
 *   and calls.
 * @requires module:arrayParsing
 * @requires module:stringParsing
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

let arrayParsing = require('./rules/arrayParsing');
let stringParsing = require('.rules/stringParsing');
let D = require('../structures/data');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `businessRules.${baseFileName}.`

/**
 * @function initRulesLibrary
 * @description Initializes the business rules function data structure on D. 
 * @returns {void}
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @NOTE Be aware that the commands and business rules data fields in the data
 *  will display as empty when printing the data structure even when JSON.stringify
 *  is used. The functions cannot be serialized in any way. This may be slightly confusing.
 *  The object will appear empty, but they are there.
 */
export const initRulesLibrary = function () {
    let functionName = initRulesLibrary.name;
    console.log(`BEGIN: ${namespacePrefix}${functionName} function.`);

    D['businessRules'] = {};
    D['businessRules'] = {
        ['echo']: (inputData, inputMetaData) => console.log(JSON.stringify(inputData)),

        /** Business Rules
         * ******************************************************
         * arrayParsing rules in order
         */
        ['replaceCharacterWithCharacter']: (inputData, inputMetaData) => arrayParsing.replaceCharacterWithCharacter(inputData, inputMetaData),

        // stringParsing rules in order
        ['parseSystemRootPath']: (inputData, inputMetaData) => stringParsing.parseSystemRootPath(inputData, inputMetaData),
        ['stringToDataType']: (inputData, inputMetaData) => stringParsing.stringToDataType(inputData, inputMetaData),
        ['stringToBoolean']: (inputData, inputMetaData) => stringParsing.stringToBoolean(inputData, inputMetaData),
        ['determineObjectDataType']: (inputData, inputMetaData) => stringParsing.determineObjectDataType(inputData, inputMetaData),
        ['isBoolean']: (inputData, inputMetaData) => stringParsing.isBoolean(inputData, inputMetaData),
        ['isInteger']: (inputData, inputMetaData) => stringParsing.isInteger(inputData, inputMetaData),
        ['isFloat']: (inputData, inputMetaData) => stringParsing.isFloat(inputData, inputMetaData),
        ['isString']: (inputData, inputMetaData) => stringParsing.isString(inputData, inputMetaData),
        ['singleQuoteSwapAfterEquals']: (inputData, inputMetaData) => stringParsing.singleQuoteSwapAfterEquals(inputData, inputMetaData),
        ['swapForwardSlashToBackSlash']: (inputData, inputMetaData) => stringParsing.swapForwardSlashToBackSlash(inputData, inputMetaData),
        ['swapBackSlashToForwardSlash']: (inputData, inputMetaData) => stringParsing.swapBackSlashToForwardSlash(inputData, inputMetaData),
        ['swapDoubleForwardSlashToSingleForwardSlash']: (inputData, inputMetaData) => stringParsing.swapDoubleForwardSlashToSingleForwardSlash(inputData, inputMetaData),
        ['swapDoubleBackSlashToSingleBackSlash']: (inputData, inputMetaData) => stringParsing.swapDoubleBackSlashToSingleBackSlash(inputData, inputMetaData)
    };

    console.log(`END: ${namespacePrefix}${functionName} function.`);
}
