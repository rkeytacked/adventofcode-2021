#!/usr/bin/env node
const {log, readSingletonMaps, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  02 * *
 * * * * * * * */

const input = readSingletonMaps('../inputs/02.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const start1 = {horizontal: 0, depth: 0};

function move({horizontal, depth}, {forward, down, up}) {
    if (forward) {
        return {horizontal: horizontal + forward, depth};
    }
    if (down) {
        return {horizontal, depth: depth + down};
    }
    if (up) {
        return {horizontal, depth: depth - up};
    }
    throw new Error("unclear action");
}

const solution1 = input.reduce((pos, action) => move(pos, action), start1);
log('solution #1:', solution1, solution1.horizontal * solution1.depth);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const start2 = {horizontal: 0, depth: 0, aim: 0};

function navigate({horizontal, depth, aim}, {forward, down, up}) {
    if (down) {
        return {horizontal, depth, aim: aim + down};
    }
    if (up) {
        return {horizontal, depth, aim: aim - up};
    }
    if (forward) {
        return {horizontal: horizontal + forward, depth: depth + aim * forward, aim};
    }
    throw new Error("unclear action");
}

const solution2 = input.reduce((pos, action) => navigate(pos, action), start2);

log('solution #2:', solution2, solution2.horizontal * solution2.depth);
