/**
 * @file fileOperations.js
 * @module fileOperations
 * @description Contains all of the functions required to do file operations on hard drive and mounted volumes.
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @requires {@link https://www.npmkjs.com/package/fs | fs}
 * @author Ethan Graupmann
 * @date 9/3/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

let dataBroker = require('../structures/data');

let fs = require('fs');
let path = require('path');
let filesCollection = [];
const directoriesToSkip = ['browser_components', 'node_modules', 'www', 'platforms', 'Release', 'Documentation', 'Recycle', 'Trash'];
let enablefilesListLimit = false;
let filesListLimit = -1;
let hitFileLimit = false;

let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `brokers.${baseFileName}.`

/**
 * @function getJsonData
 * @description Loads the specified file and parses into a JSON object(s).
 * @param {string} pathAndFileName Path and file name of the json file that should be parsed into objects.
 * @returns {object} The JSON object as it was loaded from file.
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function getJsonData(pathAndFileName) {
    // Set function name, log beginning of function.
    let functionName = getJsonData.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`pathAndFileName is: ${pathAndFileName}.`);
    let rawData, parsedData
    try {
        pathAndFileName = path.resolve(pathAndFileName);
        rawData = fs.readFileSync(pathAndFileName, { encoding: 'UTF8' });
        parsedData = JSON.parse(rawData);
    } catch (err) {
        console.log("ERROR: " + err.message);
    }

    console.log(`parsedData is: ${JSON.stringify(parsedData)}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return parsedData;
};

/**
 * @function readDirectoryContents
 * @description Wrapper for calling readDirectorySynchronously, as it doesn't return anything, but works with a global variable.
 * @param {string} directory Path to be scanned.
 * @returns {object} Object with an array of files in folder and subfolders.
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function readDirectoryContents(directory) {
    // Set function name, log beginning of function.
    let functionName = readDirectoryContents.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`directory is: ${directory}.`);



    console.log(`parsedData is: ${JSON.stringify(parsedData)}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return parsedData;
};