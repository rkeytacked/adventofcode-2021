#!/usr/bin/env node
const {log, readCharArrays, sum} = require("./common");

/* * * * * * * *
 * * DAY  20 * *
 * * * * * * * */

const input = readCharArrays('../inputs/20.txt', char => char === '#' ? 1 : 0);

const algorithm = input[0];
let img = input.slice(2);


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function readIndex(img, x, y) {
    let index = 0;
    for (let j = y - 1; j <= y + 1; j++) {
        for (let i = x - 1; i <= x + 1; i++) {
            let bit = (j >= 0 && j < img.length) && (i >= 0 && i < img[j].length) ? img[j][i] : (img.backgroundColor || 0);
            index = index * 2 + bit;
        }
    }
    return index;
}

function applyAlgorithm(img, x, y) {
    return algorithm[readIndex(img, x, y)];
}

function increaseImage(img) {
    let height = img.length + 2;
    let width = img[0].length + 2;
    let res = [];
    for (let y = 0; y < height; y++) {
        res[y] = [];
        for (let x = 0; x < width; x++) {
            res[y][x] = applyAlgorithm(img, x - 1, y - 1);
        }
    }
    let emptyImg = {backgroundColor: img.backgroundColor, length: 0};
    res.backgroundColor = applyAlgorithm(emptyImg, 0, 0);
    return res;
}

for (let i = 0; i < 2; i++) {
    img = increaseImage(img);
}

let pixelsAfter2 = sum(img.map(sum));
log('solution #1:', pixelsAfter2);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (let i = 2; i < 50; i++) {
    img = increaseImage(img);
}

let pixelsAfter50 = sum(img.map(sum));
log('solution #2:', pixelsAfter50);
