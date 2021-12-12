#!/usr/bin/env node
const {log, readLines, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  07 * *
 * * * * * * * */

const input = readLines('../inputs/07.txt', toNumber, ',');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let average = Math.ceil(sum(input) / input.length)

const fuelCostsLinear = position => sum(input.map(x => Math.abs(x - position)));

function findLocalMinimum(start, costFunction) {
    let best = costFunction(start);
    for (let rightValue = start; costFunction(rightValue) <= best; rightValue++) {
        best = costFunction(rightValue);
    }
    for (let leftValue = start; costFunction(leftValue) <= best; leftValue--) {
        best = costFunction(leftValue);
    }
    return best;
}

const best1 = findLocalMinimum(average, fuelCostsLinear);
log('solution #1:', best1);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const fuelCostsQuadratic = position => sum(input.map(x => {
    let dist = Math.abs(x - position);
    return dist * (dist + 1) / 2;
}));

const best2 = findLocalMinimum(average, fuelCostsQuadratic);
log('solution #2:', best2);
