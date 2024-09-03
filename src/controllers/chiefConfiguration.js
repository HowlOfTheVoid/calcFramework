/**
 * @file chiefConfiguration.js
 * @module chiefConfiguration
 * @description Contains all functions to manage configuration system
 *    such as adding, setup, parsing and processing.
 * @requires module:chiefData
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 8/26/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

let chiefData = require('./chiefData');
let configurator = require('../executrix/configurator');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `framework.${baseFileName}.`

/**
 * @function setupConfiguration
 * @description Sets up all the application and framework config data.
 * @param {string} appConfigPath The path of the configuration files for the application layer
 * @param {string} frameworkConfigPath The path of the configuration files for the framework layer.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function setupConfiguration(appConfigPath, frameworkConfigPath) {
    // Set function name, log beginning of function.
    let functionName = setupConfiguration.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`App Config Path is: ${appConfigPath}.`);
    // console.log(`Framework Config Path is: ${frameworkConfigPath}.`);

    configurator.setConfigurationSetting('appConfigPath', appConfigPath);
    configurator.setConfigurationSetting('frameworkConfigPath', frameworkConfigPath);


    let allAppConfigData = {};
    let allFrameworkConfigData = {};

    allFrameworkConfigData = chiefData.setupAllJsonConfigData('frameworkConfigPath', 'configuration');
    allAppConfigData = chiefData.setupAllJsonConfigData('appConfigPath', 'configuration');

    // TODO: parseLoadedConfigurationData
    // NOTE: Cannot properly implement until we have basic business rules system.

    // TODO: Merge AppConfig and FrameworkConfig Data.

    // console.log(`All App Config Data is: ${JSON.stringify(allAppConfigData)}`);
    // console.log(`All Framework Config Data is: ${JSON.stringify(allFrameworkConfigData)}`);
    // console.log(`End: ${namespacePrefix}${functionName} function.`);

}

module.exports = {
    ['setupConfiguration']: (appConfigPath, frameworkConfigPath) => setupConfiguration(appConfigPath, frameworkConfigPath)
}