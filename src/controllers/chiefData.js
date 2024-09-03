/**
 * @file chiefData.js
 * @module chiefData
 * @description Contains all the functions to manage the loading and processing of data, such as
 *      XML, CSV, and JSON files. Additional file processing should be added as necessary to this module.
 * @requires module:dataBroker
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/3/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */


let dataBroker = require('../brokers/dataBroker');
let configurator = require('../executrix/configurator');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `controllers.${baseFileName}.`

/**
 * @function setupAllJsonConfigData
 * @description Sets up all of the JSON data at the specified configuration path.
 * @param {string} dataPathConfigurationName The name of the configuration setting that has the path we should search.
 * @param {string} contextName The context name that should be used when adding the data to the data structure D.
 * @returns {object} A JSON object that contains all the data loaded and merged together.
 * @author Ethan Graupmann
 * @data 9/3/2024
 */
function setupAllJsonConfigData(dataPathConfigurationName, contextName) {
    // Set function name, log beginning of function.
    let functionName = setupAllJsonConfigData.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`dataPathConfigurationName is: ${dataPathConfigurationName}.`);
    console.log(`contextName is: ${contextName}.`);

    let loadedAndMergedData = {};
    let dataPath = configurator.getConfigurationSetting(dataPathConfigurationName);
    dataPath = path.resolve(dataPath);
    let filesToLoad = dataBroker.scanDataPath(dataPath, contextName);

    loadedAndMergedData = dataBroker.loadAllJsonData(filesToLoad, contextName);

    console.log(`loadedAndMergedData is: ${loadedAndMergedData}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return loadedAndMergedData;
};

module.exports = {
    ['setupAllJsonConfigData']: (dataPathConfigurationName, contextName) => setupAllJsonConfigData(dataPathConfigurationName, contextName)
}
