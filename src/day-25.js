#!/usr/bin/env node
const {log, associate, readCharArrays, readLines, readSingletonMaps, split, sum, toNumber, min, max, sort, prod, median} = require("./common");

/* * * * * * * *
 * * DAY  25 * *
 * * * * * * * */

let map = readCharArrays('../inputs/25.txt');
const height = map.length;
const width = map[0].length;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function moveEast(map) {
    let hasMoved = false;
    let newMap = [];
    for (let y=0; y<height; y++) {
        newMap[y] = [];
        for(let x=0; x<width; x++) {
            let xEast  = (x+1)%width;
            if (map[y][x] === '>' && map[y][xEast] === '.') {
                newMap[y][x]  ='.';
                newMap[y][xEast] = '>';
                hasMoved = true;
            } else {
                newMap[y][x] = newMap[y][x] || map[y][x];
            }
        }
    }
    newMap.hasMoved = hasMoved
    return newMap;
}

function moveSouth(map) {
    let hasMoved = false;
    let newMap = [];
    for (let y=0; y<height; y++) {
        newMap[y] = newMap[y]||[];
        let ySouth = (y+1)%height;
        newMap[ySouth] = newMap[ySouth]||[];
        for(let x=0; x<width; x++) {
            if (map[y][x] === 'v' && map[ySouth][x] === '.') {
                newMap[y][x]  ='.';
                newMap[ySouth][x] = 'v';
                hasMoved = true;
            } else {
                newMap[y][x] = newMap[y][x] || map[y][x];
            }
        }
    }
    newMap.hasMoved = hasMoved
    return newMap;
}

let rounds = 0;
while (true) {
    rounds++;
    let mapEast = moveEast(map);
    let mapSouth = moveSouth(mapEast);
    if (!mapEast.hasMoved && !mapSouth.hasMoved) {
        break;
    }
    map = mapSouth;
}

log('solution #1', rounds)

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2: merry X-mas');