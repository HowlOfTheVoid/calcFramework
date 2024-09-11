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

    let returnData = '';
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

};

/**
 * @function stringToDataType
 * @description Converts a string to the appropriate data value. 
 *   Example: "3.14159265" will convert to a float of the same value.
 *   Example: "false" will convert to a boolean.
 *   Example: "12" will convert to an integer.
 *   Example: "Happy Birthday" will convert to a string of the same value.
 *   Arrays of strings or objects will return the same as the input.
 * @param {string} inputData The string that should be converted to some value
 * @param {string} inputMetaData NOT USED
 * @returns {object|string|boolean|integer|float} Returns value of whatever type the string can be converted to.
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
export const stringToDataType = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = stringToDataType.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}.`);

    let returnData = '';
    if (inputData) {
        let dataType = determineObjectDataType(inputData, '');
        switch (dataType) {
            case 'Boolean':
                returnData = stringToBoolean(inputData, '');
                break;
            case 'Integer':
                returnData = parseInt(inputData, '');
                break;
            case 'Float':
                returnData = parseFloat(inputData, '');
                break;
            case 'String':
                returnData = inputData;
                break;
            default: // Don't know what kind of object. Return it the way it is.
                returnData = inputData;
                break;
        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;
};

/**
 * @function stringToBoolean
 * @description Converts string to boolean.
 * @param {string} inputData String that contains "true" or "false" and should be converted
 * @param {string} inputMetaData NOT USED
 * @returns {boolean} A boolean value of either true or false based on business rule conversion
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @NOTE We cannot pass a 1 or 0 into this and expect it to evaluate as true or false.
 *   We have another function passing strings into function, and part of data-type check is if
 *   a string is a number. If we have it evaluate a 1/0 to a Boolean, then integer function would
 *   never get a chance to evaluate.
 */
export const stringToBoolean = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = stringToBoolean.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}.`);

    let returnData = false;
    if (inputData) {
        if (typeof inputData === 'boolean') {
            returnData = inputData;
        } else {
            switch (inputData.toLowerCase().trim()) {
                case 'true': case 't': case 'y': case 'yes': case 'on':
                    returnData = true;
                    break;
                case 'false': case 'f': case 'n': case 'no': case 'off':
                    returnData = false;
                    break;
            }
        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;
}

/**
 * @function determineObjectDataType
 * @description Determines if the contents of a string are actually a Boolean, Integer, Float, String or otherwise.
 * @param {string} inputData A string with a value that we should identify the type of.
 * @param {string} inputMetaData NOT USED
 * @returns {string} A string that indicates the data type - Boolean, Integer, Float, String, or other.
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
export const determineObjectDataType = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = determineObjectDataType.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${inputMetaData}.`);

    let returnData = '';
    if (inputData) {
        if (isBoolean(inputData, '') === true) {
            returnData = 'Boolean';
        } else if (isInteger(inputData, '') === true) {
            returnData = 'Integer';
        } else if (isFloat(inputData, '') === true) {
            returnData = 'Float';
        } else if (isString(inputData, '') === true) {
            returnData = 'String';
        } else {
            // Can't tell differences between data types beyond this, and we don't necessarily need to yet.
            returnData = 'Object';
        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;
};

/**
 * @function isBoolean
 * @description Determines if the input string is a boolean type of value:
 *   "true", "True", "TRUE", "t", "T", "y", "Y", "yes", "Yes", "YES", "on", "On", "ON" or
 *   "false", "False", "FALSE", "f", "F", "n", "N", "no", "No", "NO", "off", "Off", "OFF"
 * @param {string} inputData The string that should be checked if is Boolean.
 * @param {string} inputMetaData NOT USED
 * @returns {bool} A boolean value of true or false to indicate if input is boolean.
 * @author Ethan Graupmann
 * @date 9/11/2024
 * 
 */
export const isBoolean = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = isBoolean.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${inputMetaData}.`);

    let returnData = false;
    if (inputData) {
        if (typeof inputData === 'boolean') {
            returnData = true;
        } else {
            inputData = inputData.toLowerCase().trim();
            if (inputData === 'true' ||
                inputData === 't' ||
                inputData === 'y' ||
                inputData === 'yes' ||
                inputData === 'on' ||
                inputData === 'false' ||
                inputData === 'f' ||
                inputData === 'n' ||
                inputData === 'no' ||
                inputData === 'off') {

                returnData = true;
            } else {
                returnData = false;
            }
        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;
};

/**
 * @function isInteger
 * @description Determines if the input is of type integer: -9007299254740992 to 9007299254740992
 * @param {string} inputData String that should be checked if of an integer type.
 * @param {string} inputMetaData NOT USED
 * @returns {boolean} Whether or not the string input is of type integer or not.
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
export const isInteger = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = isInteger.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${inputMetaData}.`);

    let returnData = false;
    if (inputData) {
        if (!isNaN(inputData)) {
            if (inputData % 1 == 0) {
                // Whole number, aka: Integer
                returnData = true;
            } else {
                //Might be a number, but not a whole number
                returnData = false;
            }
        } else {
            //Here for completeness. Can be used for logging.
            returnData = false;
        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;
};

/**
 * @function isFloat
 * @description Determines if the given input string is a floating point value or not.
 * @param {string} inputData String that should be checked if it is Float or not.
 * @param {string} inputMetaData NOT USED
 * @returns {boolean} Whether or not the string given is of float type.
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
export const isFloat = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = isFloat.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${inputMetaData}.`);

    let returnData = false;
    if (inputData) {
        if (!isNaN(inputData) && inputData.indexOf('.') !== -1) {
            returnData = true;
        } else {
            //Here for completeness. Can be used for logging.
            returnData = false;
        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;

};

/**
 * @function isString
 * @description Determines if the input string is a string or not, by process of elimination.
 *   If not a bool, integer, or float, then it's probably a string.
 * @param {string} inputData String that is checked if it is a string, not a bool, integer, or float
 * @param {string} inputMetaData NOT USED
 * @returns {boolean} Whether or not the string given is a string.
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
export const isString = function (inputData, inputMetaData) {
    // Set function name, log beginning of function.
    let functionName = isString.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${inputData}.`);
    console.log(`inputMetaData is: ${inputMetaData}.`);

    let returnData = false;
    if (inputData) {
        if (isBoolean(inputData, '') === false &&
            isInteger(inputData, '') === false &&
            isFloat(inputData, '') === false &&
            (inputData instanceof String || typeof inputData === 'string'){
            returnData = true;
        } else {

        }
    }// End-if (inputData)

    console.log(`returnData is: ${returnData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnData;

}