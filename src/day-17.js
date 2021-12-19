#!/usr/bin/env node
const {log, readLines, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  17 * *
 * * * * * * * */

const input = readLines('../inputs/17.txt', toNumber, /[^0-9-]+/g);
const [, targetX1, targetX2, targetY1, targetY2] = input;


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findMaxY(vx, vy) {
    for (let x = vx, y = vy; x <= targetX2 && y >= targetY1; x += vx, y += vy) {
        if (x >= targetX1 && y <= targetY2) {
            return true; // target hit
        }

        if (vx > 0) {
            vx--; // drag
        }
        vy--; // gravity
    }
}


let yMax = 0;
let count = 0;

let minVX = Math.ceil(Math.sqrt(2 * targetX1));
for (let vx = minVX; vx <= targetX2; vx++) {
    for (let vy = targetY1; vy <= -targetY1; vy++) {
        if (findMaxY(vx, vy)) {
            count++
            if (vy > 0) {
                yMax = vy * (vy + 1) / 2;
            }
        }
    }
}

log('solution #1', yMax);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2', count);
