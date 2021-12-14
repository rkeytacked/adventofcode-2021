#!/usr/bin/env node
const {log, readLines, split, sum} = require("./common");

/* * * * * * * *
 * * DAY  12 * *
 * * * * * * * */

const paths = readLines('../inputs/12.txt', split('-'))
    .reduce((x, [from, to]) => {
        if (from !== "end" && to !== "start") {
            (x[from] = x[from] || []).push(to);
        }
        if (from !== "start" && to !== "end") {
            (x[to] = x[to] || []).push(from);
        }
        return x;
    }, {});

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function countPaths(from = 'start', visited = {}) {
    if (from === 'end') {
        return 1;
    }
    if (from === from.toLowerCase() && visited[from]) {
        return 0;
    }
    visited = {...visited, [from]: true};
    return paths[from] ? sum(paths[from].map(x => countPaths(x, visited))) : 0;
}

log('solution #1:', countPaths());


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function countPaths2(from = 'start', visited = {}, visitedSmallCaveTwice = false) {
    if (from === 'end') {
        return 1;
    }
    if (from === from.toLowerCase() && visited[from]) {
        if (visitedSmallCaveTwice) {
            return 0;
        }
        visitedSmallCaveTwice = true;
    }
    visited = {...visited, [from]: true};
    return paths[from] ? sum(paths[from].map(x => countPaths2(x, visited, visitedSmallCaveTwice))) : 0;
}

log('solution #2:', countPaths2());
