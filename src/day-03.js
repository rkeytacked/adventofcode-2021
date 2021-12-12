#!/usr/bin/env node
const {log, readCharArrays, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  03 * *
 * * * * * * * */

const input = readCharArrays('../inputs/03.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const indexes = [...input[0].keys()];

function countBits(arr, index) {
    return arr.reduce((sum, line) => sum + line[index], 0);
}

function toGammaBit(arr, index) {
    return countBits(arr, index) >= arr.length / 2 ? 1 : 0;
}

function toEpsilonBit(arr, index) {
    return countBits(arr, index) >= arr.length / 2 ? 0 : 1;
}

function asInt(line) {
    return parseInt(line.join(''), 2);
}

const gammaBits = indexes.map(index => toGammaBit(input, index));
log("gamma " + gammaBits);

const epsilonBits = indexes.map(index => toEpsilonBit(input, index));
log("epsilon " + epsilonBits);

const gamma = asInt(gammaBits);
const epsilon = asInt(epsilonBits);
log('solution #1:', gamma, "*", epsilon, "=", gamma * epsilon);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function filterIndexValue(arr, index, value) {
    return arr.filter(line => line[index] === value);
}

let oxygens = indexes.reduce((arr, index) => arr.length <= 1 ? arr : filterIndexValue(arr, index, toGammaBit(arr, index)), input);
log("oxygens " + oxygens);

let scrubbers = indexes.reduce((arr, index) => arr.length <= 1 ? arr : filterIndexValue(arr, index, toEpsilonBit(arr, index)), input);
log("scrubbers " + scrubbers);

const o2 = asInt(oxygens[0]);
const co2 = asInt(scrubbers[0]);
log('solution #2:', o2, "*", co2, "=", o2 * co2);
