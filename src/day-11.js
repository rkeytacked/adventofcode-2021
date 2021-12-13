#!/usr/bin/env node
const {log, readCharArrays, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  11 * *
 * * * * * * * */

const input = readCharArrays('../inputs/11.txt', toNumber);
const width = input.length;
const height = input[0].length;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function step(map) {
    let flashes = 0;

    function increaseEnergyLevel(x, y) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            map[x][y]++;
            if (map[x][y] === 10) {
                flashes++;
                increaseEnergyLevel(x - 1, y - 1);
                increaseEnergyLevel(x - 1, y);
                increaseEnergyLevel(x - 1, y + 1);
                increaseEnergyLevel(x, y - 1);
                increaseEnergyLevel(x, y + 1);
                increaseEnergyLevel(x + 1, y - 1);
                increaseEnergyLevel(x + 1, y);
                increaseEnergyLevel(x + 1, y + 1);
            }
        }
    }

    function increaseOctopuses() {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                increaseEnergyLevel(i, j)
            }
        }
    }

    function resetFlashedOctopuses() {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (map[i][j] >= 10) {
                    map[i][j] = 0
                }
            }
        }
    }

    increaseOctopuses()
    resetFlashedOctopuses()

    return flashes;
}

let totalFlashes = 0;
for (let i = 0; i < 100; i++) {
    totalFlashes += step(input);
}

log('solution #1:', totalFlashes);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function firstTimeAllFlash(map) {
    for (let nrStep = 1; ; nrStep++) {
        let flashes = step(input);
        if (flashes === width * height) {
            return nrStep
        }
    }
}

const nrStepFirstAll = 100 + firstTimeAllFlash()

log('solution #2:', nrStepFirstAll);
