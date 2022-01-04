#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  24 * *
 * * * * * * * */

const input = readLines('../inputs/24.txt', s => s.trim().replace(/\n/g, ''), 'inp w')
    .filter(x => x); // trim empty blocks

const increasePattern = new RegExp('^' +
    'mul x 0' +
    'add x z' +
    'mod x 26' +
    'div z 1' +
    'add x \\d+' +
    'eql x w' +
    'eql x 0' +
    'mul y 0' +
    'add y 25' +
    'mul y x' +
    'add y 1' +
    'mul z y' +
    'mul y 0' +
    'add y w' +
    'add y (\\d+)' +
    'mul y x' +
    'add z y' +
    '$');

const decreasePattern = new RegExp('^' +
    'mul x 0' +
    'add x z' +
    'mod x 26' +
    'div z 26' +
    'add x (-\\d+)' +
    'eql x w' +
    'eql x 0' +
    'mul y 0' +
    'add y 25' +
    'mul y x' +
    'add y 1' +
    'mul z y' +
    'mul y 0' +
    'add y w' +
    'add y \\d+' +
    'mul y x' +
    'add z y' +
    '$');


const blocks = input.map((block, i) => {
    let match = increasePattern.exec(block);
    if (match) {
        let num = Number(match[1]);
        log('Block', i, ': z = 26z + w +', num);
        return (w, z) => 26 * z + w + num;
    }
    match = decreasePattern.exec(block);
    if (match) {
        let num = Number(match[1]);
        log('Block', i, ': z = z/26; if w == z', num, '| mod 26');
        return (w, z) => (z % 26 + num) === w && Math.floor(z / 26);
    }
    throw "unsupported algorithm: " + block;
});


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function checkRecursive(digits, prefix = '', position = 0, zValue = 0) {
    if (position >= blocks.length) {
        return zValue === 0 && prefix;
    }
    let func = blocks[position];
    for (let w of digits) {
        let newZ = func(Number(w), zValue);
        let success = newZ !== false && checkRecursive(digits, prefix + w, position + 1, newZ);
        if (success) {
            return success;
        }
    }
}

let highestModelNumber = checkRecursive([9, 8, 7, 6, 5, 4, 3, 2, 1]);
log('solution #1, highest model number:', highestModelNumber);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let lowestModelNumber = checkRecursive([1, 2, 3, 4, 5, 6, 7, 8, 9]);
log('solution #2, lowest model number:', lowestModelNumber);
