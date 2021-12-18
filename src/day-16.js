#!/usr/bin/env node
const {log, min, max, readLines, sum, prod} = require("./common");

/* * * * * * * *
 * * DAY  16 * *
 * * * * * * * */

const input = readLines('../inputs/16.txt', toHex, '').join('');

function toHex(c) {
    return parseInt(c, 16).toString(2).padStart(4, "0");
}


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */


function readNumber(readState, nrBits) {
    let binary = readState.text.substr(readState.pos, nrBits);
    readState.pos += nrBits;
    return parseInt(binary, 2);
}

function parsePacket(readState) {
    let version = readNumber(readState, 3);
    let typeID = readNumber(readState, 3);
    return (typeID === 4)
        ? {version, typeID, value: parseLiteral(readState)}
        : {version, typeID, packets: parseSubPackets(readState)};
}

function parseLiteral(readState) {
    let result = 0;
    for (let cont = 1; cont === 1;) {
        cont = readNumber(readState, 1);
        result = result * 16 + readNumber(readState, 4);
    }
    return result;
}

function parseSubPackets(readState) {
    let lengthTypeID = readNumber(readState, 1);
    let packets = [];
    if (lengthTypeID === 0) {
        let length = readNumber(readState, 15);
        for (let end = readState.pos + length; readState.pos < end;) {
            packets.push(parsePacket(readState));
        }
    } else {
        let count = readNumber(readState, 11);
        for (let i = 0; i < count; i++) {
            packets.push(parsePacket(readState));
        }
    }
    return packets;
}

const message = parsePacket({text: input, pos: 0});


function fetchVersions({version, packets}) {
    return packets ? [version, ...packets.flatMap(fetchVersions)] : [version];
}

const versions = fetchVersions(message);
log('solution #1:', sum(versions));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


function evaluate({typeID, value, packets}) {
    let values = packets && packets.map(evaluate);
    switch (typeID) {
        case 0:
            return sum(values);
        case 1:
            return prod(values);
        case 2:
            return min(values);
        case 3:
            return max(values);
        case 5:
            return values[0] > values[1] ? 1 : 0;
        case 6:
            return values[0] < values[1] ? 1 : 0;
        case 7:
            return values[0] === values[1] ? 1 : 0;
        default:
            return value;
    }
}

const value = evaluate(message);
log('solution #2:', value);
