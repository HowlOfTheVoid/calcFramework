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
let enableFilesListLimit = false;
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
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`pathAndFileName is: ${pathAndFileName}.`);
    let rawData, parsedData
    try {
        pathAndFileName = path.resolve(pathAndFileName);
        rawData = fs.readFileSync(pathAndFileName, { encoding: 'UTF8' });
        parsedData = JSON.parse(rawData);
    } catch (err) {
        console.log("ERROR: " + err.message);
    }

    // console.log(`parsedData is: ${JSON.stringify(parsedData)}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return parsedData;
};

/**
 * @function readDirectoryContents
 * @description Wrapper for calling readDirectorySynchronously, as it doesn't return anything, but works with a global variable.
 * @param {string} directory The path to be scanned
 * @returns {array<string>} An array of strings containing a list of all files in the foler and all sub-folders.
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function readDirectoryContents(directory) {
    // Set function name, log beginning of function.
    let functionName = readDirectoryContents.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`directory is: ${directory}.`);

    let filesFound = [];
    // Resolve path on local system
    directory = path.resolve(directory);
    readDirectorySynchronously(directory);
    filesFound = filesCollection; // Copy to local variable.
    filesCollection = undefined; // Clear it to avoid corrupting other file operations.
    filesCollection = [];

    // console.log(`filesFound is: ${JSON.stringify(filesFound)}`)
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return filesFound;
}

/**
 * @function readDirectorySynchronously
 * @description Recursively parses through all sub-folders, loads all names of files contained in each subfolder to an array.
 * @param {string} directory Path to be scanned.
 * @returns {array<string>} Array of all the contained in all levels in folders/subfolders.
 * @NOTE Doesn't return anything, actually - File data is stored in global fileCollection variable.
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function readDirectorySynchronously(directory) {
    // Set function name, log beginning of function.
    let functionName = readDirectorySynchronously.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`directory is: ${directory}.`);

    if (hitFileLimit === false) {
        directory = path.resolve(directory);
        let currentDirectoryPath = directory;
        let currentDirectory = '';
        try {
            currentDirectory = fs.readdirSync(currentDirectoryPath, 'UTF8');

        } catch (err) {
            try {
                fs.mkdirSync(currentDirectoryPath);
                currentDirectory = fs.readdirSync(currentDirectoryPath, 'UTF8');
            } catch (err2) {
                console.log("ERROR: " + err.message);
                console.log("DEEPER ERROR: " + err2.message);
            }
        }
        currentDirectory.forEach(file => {
            let filesShouldBeSkipped = directoriesToSkip.indexOf(file) > -1;
            let pathOfCurrentItem = directory + '//' + file;

            try {
                if (!filesShouldBeSkipped && fs.statSync(pathOfCurrentItem).isFile()) {
                    if (enableFilesListLimit === true && filesListLimit > 0) {
                        if (filesCollection.length <= filesListLimit) {
                            // console.log(`Haven't hit file limit yet.`);
                            // console.log(`${filesCollection.length} <= ${filesListLimit}`);
                            filesCollection.push(pathOfCurrentItem);
                            // console.log(`filesCollection is: ${JSON.stringify(filesCollection)}`);
                        } else {
                            // console.log(`File limit hit! At ${filesCollection.length} on file ${pathOfCurrentItem}`);
                            hitFileLimit = true;
                            return;
                        }
                    } else {
                        // console.log(`Adding file old way.`);
                        filesCollection.push(pathOfCurrentItem);
                    }
                } else if (!filesShouldBeSkipped) {
                    // Due to the differences between how Mac/Linux and Windows handles paths, this will attempt to catch
                    //    both situations.
                    // Ideal situation would be to detect which OS, then handle appropriately.
                    let directoryPath = '';
                    directoryPath = path.resolve(directory + '//' + file);
                    // console.log(`Directory path is: ${directoryPath}`);
                    readDirectorySynchronously(directoryPath);
                }
            } catch (err) {
                console.log(`ERROR: Invalid access to ${pathOfCurrentItem} : ` + err.message);
            }
        });
    }
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
};

/**
 * @function cleanRootPath
 * @description Takes application root path and cleans it to give real root path
 * @returns {string} Real root / Top-level path for application.
 * @NOTE Problematic bercause init functions are contained in lower level folders.
 *  This helps with organization and overall project scalability and reusability.
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function cleanRootPath() {
    // Set function name, log beginning of function.
    let functionName = cleanRootPath.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);

    let rootPath;

    // console.log(`rootPath is: ${rootPath}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return rootPath;

}

module.exports = {
    ['getJsonData']: (pathAndFileName) => getJsonData(pathAndFileName),
    ['readDirectoryContents']: (directory) => readDirectoryContents(directory),
    ['readDirectorySynchronously']: (directory) => readDirectorySynchronously
    
}