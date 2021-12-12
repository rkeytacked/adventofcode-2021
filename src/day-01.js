#!/usr/bin/env node
const {log, readLines, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

const depths = readLines('../inputs/01.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function getNrOfIncreases(depths) {
    let nrOfIncreases = 0;
    for (let i = 1; i < depths.length; i++) {
        if (depths[i] > depths[i - 1]) {
            nrOfIncreases++;
        }
    }
    return nrOfIncreases;
}

log('solution #1:', getNrOfIncreases(depths));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function windowsOfThree(depths) {
    const windows = [];
    for (let i = 2; i < depths.length; i++) {
        windows.push(depths[i] + depths[i - 1] + depths[i - 2]);
    }
    return windows;
}

function getNrOfSlidingWindowIncreases(depths) {
    const windows = windowsOfThree(depths);
    return getNrOfIncreases(windows);
}

log('solution #2:', getNrOfSlidingWindowIncreases(depths));
