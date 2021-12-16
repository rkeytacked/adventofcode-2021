#!/usr/bin/env node
const {log, readLines, min, max} = require("./common");

/* * * * * * * *
 * * DAY  14 * *
 * * * * * * * */

const input = readLines('../inputs/14.txt');

let template = input[0];
let rules = input.slice(2).map(line => line.split(' -> '))
    .reduce((obj, [pair, char]) => ({...obj, [pair]: char}), {});


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function addCounts(counts1, counts2) {
    let result = {...counts1};
    for (let c in counts2) {
        result[c] = (result[c] || 0) + counts2[c]
    }
    return result;
}

const CACHE = {};

function countRecursive(pair, iter) {
    let key = `${pair}:${iter}`;
    return CACHE[key] || (CACHE[key] = computeRecursive(pair, iter));
}

function computeRecursive(pair, iter) {
    if (iter <= 0) {
        return {};
    }
    let char = rules[pair];
    let counts = addCounts(countRecursive(pair[0] + char, iter - 1), countRecursive(char + pair[1], iter - 1));
    counts[char] = (counts[char] || 0) + 1;
    return counts;
}

function countCharsAfterIterations(text, iter) {
    let counts = [...text].reduce((obj, char) => ({...obj, [char]: (obj[char] || 0) + 1}), {})
    for (let i = 0; i < text.length - 1; i++) {
        counts = addCounts(counts, countRecursive(text[i] + text[i + 1], iter))
    }
    return counts;
}

function getMinMax(counts) {
    let minNr = min(Object.values(counts));
    let maxNr = max(Object.values(counts));
    return [minNr, maxNr];
}

let counts10 = countCharsAfterIterations(template, 10);
let [min10, max10] = getMinMax(counts10)
log('solution #1', max10, '-', min10, '=', max10 - min10);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let counts40 = countCharsAfterIterations(template, 40);
let [min40, max40] = getMinMax(counts40)
log('solution #2:', max40, '-', min40, '=', max40 - min40);
