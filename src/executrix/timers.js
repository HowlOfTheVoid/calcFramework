/**
 * @file timers.js
 * @module timers
 * @description Contains all functions needed for handling timestamps and tracking durations.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @requires {@link https://www.npmjs.com/package/moment|moment}
 * @author Ethan Graupmann
 * @date 8/26/2024
 * @copyright Copyright © 2024-_ by Ethan Graupmann, All rights reserved
 */


let path = require('path');
let moment = require('moment');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `executrix.${baseFileName}.`;

/**
 * @function getNowMoment
 * @description Returns a time stamp formatted according to the input.
 * @param {string} formatting Formatting string that tells how to format the value for day/month/year/hour/minute/second/millisecond.
 * @returns {string} A time stamp string that has been formatted according to input.
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function getNowMoment(formatting) {
    // Set function name, log beginning of function.
    let functionName = getNowMoment.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`App Config Path is: ${appConfigPath}.`);

    let returnStamp = '';
    returnStamp = moment().format(formatting);

    console.log(`returnStamp is: ${returnStamp}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return returnStamp;
};

/**
 * @function computeDeltaTime
 * @description Computes time difference between a start and end time.
 * @param {string} startTime Start of the time period computed.
 * @param {string} endTime End of the time period computed.
 * @returns {integer} The difference between beginning and ending time in milliseconds.
 * @author Ethan Graupmann
 * @date 8/26/2024
 */
function computeDeltaTime(startTime, endTime) {
    // Set function name, log beginning of function.
    let functionName = computeDeltaTime.name;
    console.log(`Begin: ${namespacePrefix}${functionName} function.`);
    console.log(`startTime is: ${startTime}.`);
    console.log(`endTime is: ${endTime}.`);

    let difference;

    console.log(`returnStamp is: ${returnStamp}`);
    console.log(`End: ${namespacePrefix}${functionName} function.`);
    return difference;

};

module.exports = {
    ['getNowMoment']: (formatting) => getNowMoment(formatting)
};