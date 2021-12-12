#!/usr/bin/env node
const {log, readLines, split, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  05 * *
 * * * * * * * */

const input = readLines('../inputs/05.txt', split(/[^\d]+/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function fillLines(lines, diagonal = false) {
    let multiples = 0;
    const map = [];
    for (let [x1, y1, x2, y2] of lines) {
        if (!diagonal && x1 !== x2 && y1 !== y2) {
            continue;
        }
        const diffX = Math.sign(x2 - x1);
        const diffY = Math.sign(y2 - y1);
        for (let i = x1, j = y1; i !== x2 + diffX || j !== y2 + diffY; i += diffX, j += diffY) {
            map[i] = map[i] || [];
            if (map[i][j] === 1) {
                multiples++;
            }
            map[i][j] = (map[i][j] || 0) + 1;
        }
    }
    return multiples;
}

const multiple1 = fillLines(input);
log('solution #1:', multiple1);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const multiple2 = fillLines(input, true);
log('solution #2:', multiple2);
