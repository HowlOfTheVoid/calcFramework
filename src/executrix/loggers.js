/**
 * @file loggers.js
 * @module loggers
 * @description Contains all functions for logging to the console, and logging to a system log file.
 *   Additional logic is in place to allow config file to define which modules/files and functions should participate
 *   in logging operations.
 * @requires module:configurator
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 8/26/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
*/

let configurator = require('../executrix/configurator');
let D = require('../structures/data');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `executrix.${baseFileName}.`;

/**
 * @function consoleLog
 * @description Compares the class path to a series of config settings. Determines if logging to console is necessary.
 *     Can log to a log file as well, since console is a data output.
 * @param {string} classPath Class path of caller
 * @param {string} message Message contents to output.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function consoleLog(classPath, message) {
    // Don't implement boilerplate here. It'd get ridiculous.
    // Don't log anything if you haven't loaded config data.
    if (Object.keys(D).length !== 0) {
        let consoleLogEnabled = configurator.getConfigurationSetting('consoleLogEnabled');
        if (consoleLogEnabled) {
            // console.log(`BEGIN loggers.consoleLog function`);
            // console.log(`classPath is: ${classPath}`);
            // console.log(`message is: ${message}`);

            let logFile = configurator.getConfigurationSetting('applicationCleanedRootPath');
            if (logFile !== undefined) {
                logFile = `${logFile}//logs`;
                // console.log(`LogFile before path.resolve is: ${logfile}`);
                logFile = path.resolve(logFile);
                // console.log(`LogFile after path.resolve is: ${logfile}`);
                logFile = logFile + `//` + configurator.getConfigurationSetting('logFilePathAndName');
                // console.log(`LogFile after path name addition is: ${logfile}`);
            }

            let debugFunctionSetting = false;
            let debugFileSetting = false;
            let debugSetting = false;
            let outputMessage = '';
            let configurationName = '';
            let configurationNamespace = '';

            // console.log(`END loggers.consoleLog function`);
        }
    }
}

