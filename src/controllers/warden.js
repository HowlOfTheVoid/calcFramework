/**
 * @file warden.js
 * @module warden
 * @description Contians all the functions to manage the application framework at the highest level
 *     Provides an interface to easily manage all framework features and functionality from one entry point.
 * @requires module:chiefConfiguration
 * @requires module:ruleBroker
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 8/26/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */


// Set up requirements and namespace.
let chiefConfiguration = require('./chiefConfiguration');
let ruleBroker = require('../brokers/ruleBroker');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `controllers.${baseFileName}.`

/**
 * @function processRootPath
 * @description Processes the root path of the application using business rules.
 * @NOTE By calling path.resolve(_dirname); this does not return the true root path of the application
 *     It returns the path to the currently executing file, or the file executed first.
 * 
 * @param {object} configData All configuration information that should be parsed for the setup process.
 * @returns {string} The true root path of the application.
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function processRootPath(configData) {
    // Set function name, log beginning of function.
    let functionName = processRootPath.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`clientConfiguration is: ${JSON.stringify(configData)}.`);

    let rules = [];
    rules[0] = 'parseSystemRulePath';
    ruleBroker.bootStrapBusinessRules();

    let applicationName = configData['applicationName'];
    let pathToProcess = configData['rootPath'];
    let resolvedPath = ruleBroker.processRules(pathToProcess, applicationName, rules);
    let rootPath = path.resolve(resolvedPath);

    // console.log(`Root Path is: ${rootPath}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return rootPath;
};

/**
 * @function initFrameworkSchema
 * @description Set up all the framework data and configuration settings.
 * @param {object} configData All configuration information that should be parsed for the setup process.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function initFrameworkSchema(configData) {
    // Set function name, log beginning of function.
    let functionName = initFrameworkSchema.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`clientConfiguration is: ${JSON.stringify(configData)}.`);

    let appConfigPath = configData['appConfigPath'];
    let frameworkConfigPath = configData['frameworkConfigPath'];
    chiefConfiguration.setupConfiguration(appConfigPath, frameworkConfigPath);

    // console.log(`End: ${namespacePrefix}${functionName} function.`);
};

module.exports = {
    ['processRootPath']: (configData) => processRootPath(configData),
    ['initFrameworkSchema']: (configData) => initFrameworkSchema(configData)
}