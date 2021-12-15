#!/usr/bin/env node
const {log, associate, readLines, max} = require("./common");

/* * * * * * * *
 * * DAY  13 * *
 * * * * * * * */

const input = readLines('../inputs/13.txt');
const blankIndex = input.findIndex(x => !x);

let instructions = input.slice(blankIndex + 1).map(line =>
    ({[line.startsWith("fold along x") ? "x" : "y"]: Number(line.substring(13))})
);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function dotEntry(x, y) {
    return [`${x}:${y}`, {x, y}];
}

const dotsHashMap = associate(input.slice(0, blankIndex), line => dotEntry(...line.split(',')));

function foldX(dots, threshold) {
    return associate(Object.values(dots), ({x, y}) => dotEntry(threshold - Math.abs(threshold - x), y));
}

function foldY(dots, threshold) {
    return associate(Object.values(dots), ({x, y}) => dotEntry(x, threshold - Math.abs(threshold - y)));
}

function fold(dots, {x, y}) {
    return x ? foldX(dots, x) : foldY(dots, y);
}

let foldedOnce = fold(dotsHashMap, instructions[0]);
let countDots = Object.keys(foldedOnce).length;

log('solution #1', countDots);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function toString(dots) {
    const width = max(Object.values(dots).map(({x}) => x));
    const height = max(Object.values(dots).map(({y}) => y));
    const map = [];
    for (let y = 0; y <= height; y++) {
        map[y] = [];
        for (let x = 0; x <= width; x++) {
            map[y][x] = dots[`${x}:${y}`] ? '##' : '  '
        }
    }
    return map.map(line => line.join('')).join('\n')
}

let foldedAll = instructions.reduce((map, i) => fold(map, i), dotsHashMap);

log('solution #2:');
log(toString(foldedAll))
