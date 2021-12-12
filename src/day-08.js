#!/usr/bin/env node
const {log, readLines, split, sum} = require("./common");

/* * * * * * * *
 * * DAY  08 * *
 * * * * * * * */
const input =
    readLines('../inputs/08.txt', split(' ', word => [...word].sort().join('')))
        .map(line => ({examples: line.slice(0, -5), digits: line.slice(-4)}));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const uniqueLengths = [2, 3, 4, 7]
const easyDigitCounts = input.map(({digits}) => digits.filter(word => uniqueLengths.includes(word.length)).length)
log('solution #1:', sum(easyDigitCounts));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function isSubSet([...subSet], [...superSet]) {
    return subSet.every(x => superSet.includes(x));
}

function translate({examples, digits}) {
    const wiring = []
    // 2 wires ==> "1"
    wiring[1] = examples.find(x => x.length === 2);
    // 3 wires ==> "7"
    wiring[7] = examples.find(x => x.length === 3);
    // 4 wires ==> "4"
    wiring[4] = examples.find(x => x.length === 4);
    // 7 wires ==> "8"
    wiring[8] = examples.find(x => x.length === 7);
    // 6 wires and superset of "4" ==> "9"
    wiring[9] = examples.find(x => x.length === 6 && isSubSet(wiring[4], x));
    // 6 wires and not "9" and superset of "7" ==> "0"
    wiring[0] = examples.find(x => x.length === 6 && x !== wiring[9] && isSubSet(wiring[7], x));
    // 6 wires and not "9" and not "0" ==> "6"
    wiring[6] = examples.find(x => x.length === 6 && x !== wiring[9] && x !== wiring[0]);
    // 5 wires and superset of "1" ==> "3"
    wiring[3] = examples.find(x => x.length === 5 && isSubSet(wiring[1], x));
    // 5 wires and subset of "6" ==> "5"
    wiring[5] = examples.find(x => x.length === 5 && isSubSet(x, wiring[6]));
    // remaining one ==> "2"
    wiring[2] = examples.find(x => !wiring.includes(x));

    let translated = digits.map(entry => wiring.indexOf(entry));
    return Number(translated.join(''))
}

let numbers = input.map(translate);
log('solution #2:', sum(numbers));
