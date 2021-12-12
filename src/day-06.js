#!/usr/bin/env node
const {log, readLines, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  06 * *
 * * * * * * * */

const input = readLines('../inputs/06.txt', toNumber, ',');

const timerCounts = new Array(9).fill(0);
input.forEach(num => timerCounts[num]++);


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function iterate(timers, count) {
    timers = timers.slice();
    for (let i = 0; i < count; i++) {
        let zeros = timers.shift();
        timers[6] += zeros;
        timers[8] = zeros;
    }
    return timers;
}

const arr1 = iterate(timerCounts, 80);
log('solution #1:', arr1.join('+'), '=', sum(arr1));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const arr2 = iterate(timerCounts, 256);
log('solution #2:', arr2.join('+'), '=', sum(arr2));
