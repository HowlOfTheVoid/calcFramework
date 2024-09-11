/**
 * @file ruleBroker.js
 * @module ruleBroker
 * @description Contains all the functions necessary to manage the business rules system
 * @requires module:rulesLibrary
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */

import * as rules from '../businessRules/rulesLibrary';
let D = require('../structures/data');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `brokers.${baseFileName}.`

/**
 * @function bootStrapBusinessRules
 * @description Coptures all of the business rule string-to-function call map data in the rulesLibrary, putting it into the D data.
 *   This is important, as the client will be allowed to define their own business rules. This means we need to merge
 *   global and client rules into one set. This allows dynamic growth and even allows user-defined rules for client needs.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
function bootStrapBusinessRules() {
    let functionName = bootStrapBusinessRules.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);

    rules.initRulesLibrary();

    console.log(`End: ${namespacePrefix}${functionName} function.`);
};

/**
 * @function addClientRules
 * @description Merges client-defined business rules with system-defined business rules.
 * @param {array<object>} clientRules The client-defined business rules to be merged with the system's.
 * @returns {void}
 * @author Ethan Graupmann
 * @date 9/11/2024
 */
function addClientRules(clientRules) {
    let functionName = addClientRules.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);

    Object.assign(D['businessRules'], clientRules);

    console.log(`End: ${namespacePrefix}${functionName} function.`);
};

/**
 * @function processRules
 * @description Parse the given input Object/String/Any through a set of business rules (Some rules won't support chaining)
 *   Where the rules are defined in the rules array.
 * @param {string|integer|boolean|object|function} inputData The primary input data that should be processed by the business rule(s).
 * @param {string|integer|boolean|object|function} inputMetaData Additional metadata that should be used processing business rule(s).
 * @param {array<string>} rulesToExecute The name(s) of the rule(s) that should be executed for modding the input data.
 * @returns {string|integer|boolean|object|function} The inputData modified by the rules provided. 
 * @author Ethan Graupmann
 * @date 9/11/2024
 * @NOTE Cannot use loggers here, circular dependency.
 */
function processRules(inputData, inputMetaData, rulesToExecute) {
    let functionName = processRules.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`inputData is: ${JSON.stringify(inputData)}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);
    console.log(`rulesToExecute is: ${JSON.stringify(rulesToExecute)}`);

    let procData = inputData;
    if (rulesToExecute) {
        for (let rule in rulesToExecute) {
            if (rulesToExecute.hasOwnProperty(rule)) {
                let key = rule;
                console.log(`key is: ${key}`);
                let value = rulesToExecute[key];
                console.log(`value is: ${value}`);

                procData = D['businessRules'][value](procData, inputMetaData);
            } // End-if "hasOwnProperty(rule)"
        } // End-for rulesToExecute
    } // End-if rulesToExecute

    console.log(`End: ${namespacePrefix}${functionName} function.`);
    console.log(`procData is: ${JSON.stringify(procData)}`);

};

module.exports = {
    ['bootStrapBusinessRules']: () => bootStrapBusinessRules(),
    ['addClientRules']: (clientRules) => addClientRules(clientRules),
    ['processRules']: (inputData, inputMetaData, rulesToExecute) => processRules(inputData, inputMetaData, rulesToExecute)
};