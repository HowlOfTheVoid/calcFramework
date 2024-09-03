/**
 * @file dataBroker.js
 * @module dataBroker
 * @description Contains all of the lower level data processing functions. Acts as interface for file operations.
 * @requires module:fileOperations
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/3/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

let fileOperations = require('../executrix/fileOperations');
let configurator = require('../executrix/configurator');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `brokers.${baseFileName}.`

/**
 * @function scanDataPath
 * @description Scans the specified path and returns a collection of all files contained recursively in that path and all subfolders.
 * @param {string} dataPath The path that should be recursively scanned for all files in all folders.
 * @returns {array<string>} Array of strings that each have full path and file name at all levels including sub-folders.
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function scanDataPath(dataPath) {
    // Set function name, log beginning of function.
    let functionName = scanDataPath.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`dataPath is: ${dataPath}.`);

    let filesFound = fileOperations.readDirectoryContents(dataPath);

    console.log(`filesFound is: ${filesFound}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return filesFound;
}

/**
* @function loadAllJsonData
* @description Loads all the contents of all files and folders at the path, and builds a list then loads them accordingly in D.contextName.
* @param {array<string>} filesToLoad Data structure containing all the files to load data from.
* @param {string} contextName The context name that should be used hen adding data to the data structure.
* @returns {object} JSON Object that contains all loaded and parsed data from input files.
* @author Ethan Graupmann
* @date 9/3/2024
*/
function loadAllJsonData(filesToLoad, contextName) {
    // Set function name, log beginning of function.
    let functionName = loadAllJsonData.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`filesToLoad is: ${JSON.stringify(filesToLoad)}.`);
    console.log(`contextName is: ${contextName}.`);

    let foundSystemData = false;
    let systemConfigFileName = 'framework.system.json';
    let applicationConfigFileName = 'application.system.json';
    let multiMergedData = {};
    let parsedDataFile = {};

    // Before loading all config data, we need to first load all the system configuration settings.
    // WHY: There will be a system configuration setting that will tell us if we need to load debug settings.
    for (let i = 0; i < filesToLoad.length; i++) {
        let fileToLoad = filesToLoad[i];
        if (fileToLoad.includes(systemConfigFileName) || fileToLoad.includes(applicationConfigFileName)) {
            let dataFile = preprocessJsonFile(fileToLoad);

            // In this case we have just loaded either framework config data, or app config data.
            //   nothing else. So we can assign the data to the multiMergedData.
            //   We'll need to merge all other files, but there will be a setting to determine if the
            //   data needs to be loaded or not.
            // We will have a new setting that determines if all extra debug settings should be loaded
            //   This optimizes the runtime, as debug can extend load times greatly.
            multiMergedData['system'] = {};
            multiMergedData['system'] = dataFile;
            foundSystemData = true;
        }
        if (foundSystemData) {
            break;
        }
    }

    // Determine if loading the rest of the data is necessary.
    if (multiMergedData['system']['system.enableDebugConfigurationSettings']) {
        if (multiMergedData['system']['system.enableDebugConfigurationSettings'] === true ||
            multiMergedData['system']['system.enableDebugConfigurationSettings'].toUpperCase() === 'TRUE' ||
            multiMergedData['system']['system.enableDebugConfigurationSettings'] === 1) {
            for (let j = 0; j < filesToLoad.length; j++) {
                let fileToLoad = filesToLoad[j]
                if (!fileToLoad.includes(systemConfigFileName) && !fileToLoad.includes(applicationConfigFileName) &&
                    fileToLoad.toUpperCase.includes('.JSON')) {
                    let dataFile = preprocessJsonFile(fileToLoad);

                    if (!multiMergedData['DebugSettings']) {
                        multiMergedData['DebugSettings'] = {};
                        multiMergedData['DebugSettings'] = dataFile;
                    } else {
                        Object.assign(multiMergedData['DebugSettings'], dataFile);
                    };
                };
            };
        };
    };

    parsedDataFile = multiMergedData;
    

    // console.log(`parsedDataFile is: ${JSON.stringify(parsedDataFile)}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return parsedDataFile;
};

/**
* @function preprocessJsonFile
* @description Load all of the data from a single JSON file.
* @param {string} fileToLoad The qualified path to the file to be loaded.
* @returns {object} JSON Object that contains all loaded data from input file.
* @author Ethan Graupmann
* @date 9/3/2024
*/
function preprocessJsonFile(fileToLoad) {
    // Set function name, log beginning of function.
    let functionName = preprocessJsonFile.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`fileToLoad is: ${fileToLoad}.`);

    let dataFile = fileOperations.getJsonData(fileToLoad);

    // console.log(`dataFile is: ${JSON.stringify(dataFile)}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return dataFile;
};

module.exports = {
    ['scanDataPath']: (dataPath) => scanDataPath(dataPath),
    ['loadAllJsonData']: (filesToLoad, contextName) => loadAllJsonData(filesToLoad, contextName)
};
