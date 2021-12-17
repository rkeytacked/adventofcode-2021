#!/usr/bin/env node
const {log, readCharArrays, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  15 * *
 * * * * * * * */

const input = readCharArrays('../inputs/15.txt', toNumber);


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findCostsForward(map) {
    const costs = [];
    for (let x = 0; x < map.length; x++) {
        costs[x] = [];
        for (let y = 0; y < map.length; y++) {
            costs[x][y] = y > 0 ?
                x > 0 ? Math.min(costs[x][y - 1], costs[x - 1][y]) + map[x][y] : costs[x][y - 1] + map[x][y] :
                x > 0 ? costs[x - 1][y] + map[x][y] : 0;
        }
    }
    return costs;
}

let costs = findCostsForward(input);
let risk = costs[input.length - 1][input.length - 1];

log('solution #1', risk);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


function increaseMap(map, times) {
    let bigMap = [];
    for (let increaseX = 0; increaseX < times; increaseX++) {
        for (let increaseY = 0; increaseY < times; increaseY++) {
            for (let x = 0; x < map.length; x++) {
                for (let y = 0; y < map.length; y++) {
                    bigMap[increaseX * map.length + x] = bigMap[increaseX * map.length + x] || [];
                    bigMap[increaseX * map.length + x][increaseY * map.length + y] = ((map[x][y] - 1 + increaseX + increaseY) % 9) + 1;
                }
            }
        }
    }
    return bigMap;
}

function optimizeAllDirections(map, costs) {
    for (let improved = true; improved;) {
        improved = false;
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map.length; y++) {
                function check(val) {
                    if (val < costs[x][y]) {
                        improved = true;
                        costs[x][y] = val;
                    }
                }

                if (x > 0)
                    check(costs[x - 1][y] + map[x][y]);
                if (x < map.length - 1)
                    check(costs[x + 1][y] + map[x][y]);
                if (y > 0)
                    check(costs[x][y - 1] + map[x][y]);
                if (y < map.length - 1)
                    check(costs[x][y + 1] + map[x][y]);
            }
        }
    }
}

const bigMap = increaseMap(input, 5);
let bigCosts = findCostsForward(bigMap);
optimizeAllDirections(bigMap, bigCosts);

let bigRisk = bigCosts[bigMap.length - 1][bigMap.length - 1];
log('solution #2', bigRisk);
