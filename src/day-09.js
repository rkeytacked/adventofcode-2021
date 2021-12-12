#!/usr/bin/env node
const {log, readCharArrays, prod, sort, sum} = require("./common");

/* * * * * * * *
 * * DAY  09 * *
 * * * * * * * */

const map = readCharArrays('../inputs/09.txt', x => 1 + Number(x)) // add 1 for the risk level

let width = map.length;
let height = map[0].length;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findLowPoints(map) {
    let lowPoints = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let noLowPoint = (map[i - 1] && map[i - 1][j] && map[i][j] >= map[i - 1][j])
                || (map[i + 1] && map[i + 1][j] && map[i][j] >= map[i + 1][j])
                || (map[i][j - 1] && map[i][j] >= map[i][j - 1])
                || (map[i][j + 1] && map[i][j] >= map[i][j + 1])
            if (!noLowPoint) {
                lowPoints.push([i, j]);
            }
        }
    }
    return lowPoints;
}

let lowPoints = findLowPoints(map);
let risks = lowPoints.map(([x, y]) => map[x][y]);

log('solution #1:', sum(risks));

log('-----------------------------------------------------------')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function count(x, y, visited) {
    if (visited[`${x}:${y}`]
        || x < 0 || x >= width
        || y < 0 || y >= height
        || map[x][y] === 10) {
        return 0;
    }
    visited[`${x}:${y}`] = true;
    return 1 + count(x - 1, y, visited) + count(x + 1, y, visited) + count(x, y - 1, visited) + count(x, y + 1, visited);
}

let sizes = lowPoints.map(([x, y]) => count(x, y, {}));
const basins = sort(sizes, true).slice(0, 3)

log("solution #2:", basins, prod(basins));
