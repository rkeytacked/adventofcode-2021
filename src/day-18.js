#!/usr/bin/env node
const {log, readLines,} = require("./common");

/* * * * * * * *
 * * DAY  18 * *
 * * * * * * * */

const input = readLines('../inputs/18.txt', word => JSON.parse(word))


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function snailfishAdd(x, y) {
    let values = unfoldPairToDepthValues([x, y]);
    while (doExplode(values) || doSplit(values)) {}
    return foldValuesIntoPair(values);
}

function unfoldPairToDepthValues(value, depth = 0) {
    return typeof value === "number"
        ? [{value, depth}]
        : value.flatMap(x => unfoldPairToDepthValues(x, depth + 1));
}

function foldValuesIntoPair(values, state = {pos: 0}, depth = 0) {
    return values[state.pos].depth > depth
        ? [foldValuesIntoPair(values, state, depth + 1), foldValuesIntoPair(values, state, depth + 1)]
        : values[state.pos++].value;
}

function doExplode(values) {
    let i = values.findIndex(({depth}) => depth > 4);
    if (i < 0) {
        return false;
    }
    if (i > 0) {
        values[i - 1].value += values[i].value;
    }
    if (i < values.length - 2) {
        values[i + 2].value += values[i + 1].value;
    }
    values.splice(i, 2, {
        value: 0,
        depth: values[i].depth - 1
    });
    return true;
}

function doSplit(values) {
    let i = values.findIndex(({value}) => value >= 10);
    if (i < 0) {
        return false;
    }
    values.splice(i, 1, {
        value: Math.floor(values[i].value / 2),
        depth: values[i].depth + 1
    }, {
        value: Math.ceil(values[i].value / 2),
        depth: values[i].depth + 1
    });
    return true;
}

function magnitude(value) {
    return typeof value === 'number'
        ? value
        : 3 * magnitude(value[0]) + 2 * magnitude(value[1]);
}

const totalSum = input.reduce(snailfishAdd);
log('solution #1', magnitude(totalSum));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let maxMagnitude = 0;
for (let a of input) {
    for (let b of input) {
        if (a !== b) {
            maxMagnitude = Math.max(maxMagnitude, magnitude(snailfishAdd(a, b)), magnitude(snailfishAdd(b, a)));
        }
    }
}

log('solution #2', maxMagnitude);
