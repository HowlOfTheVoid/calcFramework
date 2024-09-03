/**
 * @file configurator.js
 * @module configurator
 * @description Contains the functions necessary to set and get configuration settings from the shared data structure.
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/3/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

let D = require('../structures/data');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `executrix.${baseFileName}.`

/**
 * @function setConfigurationSetting
 * @description Sets a configuration setting on the data structure stored on the D-Data structure
 * @param {string} configurationName The key for the configuration setting
 * @param {string|integer|boolean|double} configurationValue The value of the configuration setting
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function setConfigurationSetting(configurationName, configurationValue) {
    // Set function name, log beginning of function.
    let functionName = setConfigurationSetting.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`Configuration Name is: ${configurationName}.`);
    // console.log(`Configuration Value is: ${configurationValue}.`);

    let configurationDataRoot = D['configuration'];
    if (!configurationDataRoot) {
        D['configuration'] = {};
        configurationDataRoot = D['configuration'];
    }
    configurationDataRoot[configurationName] = configurationValue;

    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    
};

/**
 * @function getConfigurationSetting
 * @description Gets a configuration value based on the configuration name.
 * @param {string} configurationName The key for the configuration setting.
 * @returns {string|integer|boolean|double} The value of whatever was stored in D[configurationName].
 * @author Ethan Graupmann
 * @date 9/3/2024
 */
function getConfigurationSetting(configurationName) {
    // Set function name, log beginning of function.
    let functionName = getConfigurationSetting.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`Configuration Name is: ${configurationName}.`);

    let returnConfigurationValue;
    if (D['configuration'] !== undefined) {
        if (D['configuration'][configurationName] !== undefined) {
            returnConfigurationValue = D['configuration'][configurationName];
        } else {
            returnConfigurationValue = undefined;
        }
    } else {
        returnConfigurationValue = undefined;
    }
    // console.log(`returnConfigurationValue is: ${returnConfigurationValue}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnConfigurationValue;
};

module.exports = {
    ['setConfigurationSetting']: (configurationName, configurationValue) => setConfigurationSetting(configurationName, configurationValue),
    ['getConfigurationSetting']: (configurationName) => getConfigurationSetting(configurationName)
}


