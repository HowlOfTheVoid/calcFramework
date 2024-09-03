/**
 * @file main.js
 * @module main
 * @description Contains all customer facing functions that are used to interface with the rest of the application framework
 * @requires module:warden
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 8/26/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

// Set up requirements and namespace.
let warden = require('./controllers/warden.js');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `framework.${baseFileName}.`

/**
 * @function initFramework
 * @description Initializes the framework systems.
 * @param {object} clientConfiguration A configuration data object, containing all data to bootstrap the framework.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function initFramework(clientConfiguration) {
    // Set function name, log beginning of function.
    let functionName = initFramework.name;
    // console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    // console.log(`clientConfiguration is: ${JSON.stringify(clientConfiguration)}.`);

    let appRootPath = warden.processRootPath(clientConfiguration);
    clientConfiguration['appRootPath'] = appRootPath;
    clientConfiguration['appConfigPath'] = appRootPath + clientConfiguration['appConfigReference'];
    clientConfiguration['frameworkConfigPath'] = __dirname + '//resources//configuration';
    warden.initFrameworkSchema(clientConfiguration);

    // console.log(`End: ${namespacePrefix}${functionName} function.`);

};

module.exports = {
    ['initFramework']: (clientConfiguration) => initFramework(clientConfiguration)
};