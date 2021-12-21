#!/usr/bin/env node
const {log, readLines, split, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  19 * *
 * * * * * * * */

const input = readLines('../inputs/19.txt', split(/---\s+(.*)\s+---\s+/g), '\n\n')

const orientations = [
    {X: ([x, y, z]) => x, Y: ([x, y, z]) => y, Z: ([x, y, z]) => z},
    {X: ([x, y, z]) => x, Y: ([x, y, z]) => -z, Z: ([x, y, z]) => y},
    {X: ([x, y, z]) => x, Y: ([x, y, z]) => -y, Z: ([x, y, z]) => -z},
    {X: ([x, y, z]) => x, Y: ([x, y, z]) => z, Z: ([x, y, z]) => -y},
    {X: ([x, y, z]) => -x, Y: ([x, y, z]) => y, Z: ([x, y, z]) => -z},
    {X: ([x, y, z]) => -x, Y: ([x, y, z]) => z, Z: ([x, y, z]) => y},
    {X: ([x, y, z]) => -x, Y: ([x, y, z]) => -y, Z: ([x, y, z]) => z},
    {X: ([x, y, z]) => -x, Y: ([x, y, z]) => -z, Z: ([x, y, z]) => -y},

    {X: ([x, y, z]) => y, Y: ([x, y, z]) => z, Z: ([x, y, z]) => x},
    {X: ([x, y, z]) => y, Y: ([x, y, z]) => -x, Z: ([x, y, z]) => z},
    {X: ([x, y, z]) => y, Y: ([x, y, z]) => -z, Z: ([x, y, z]) => -x},
    {X: ([x, y, z]) => y, Y: ([x, y, z]) => x, Z: ([x, y, z]) => -z},
    {X: ([x, y, z]) => -y, Y: ([x, y, z]) => z, Z: ([x, y, z]) => -x},
    {X: ([x, y, z]) => -y, Y: ([x, y, z]) => x, Z: ([x, y, z]) => z},
    {X: ([x, y, z]) => -y, Y: ([x, y, z]) => -z, Z: ([x, y, z]) => x},
    {X: ([x, y, z]) => -y, Y: ([x, y, z]) => -x, Z: ([x, y, z]) => -z},

    {X: ([x, y, z]) => z, Y: ([x, y, z]) => x, Z: ([x, y, z]) => y},
    {X: ([x, y, z]) => z, Y: ([x, y, z]) => -y, Z: ([x, y, z]) => x},
    {X: ([x, y, z]) => z, Y: ([x, y, z]) => -x, Z: ([x, y, z]) => -y},
    {X: ([x, y, z]) => z, Y: ([x, y, z]) => y, Z: ([x, y, z]) => -x},
    {X: ([x, y, z]) => -z, Y: ([x, y, z]) => x, Z: ([x, y, z]) => -y},
    {X: ([x, y, z]) => -z, Y: ([x, y, z]) => y, Z: ([x, y, z]) => x},
    {X: ([x, y, z]) => -z, Y: ([x, y, z]) => -x, Z: ([x, y, z]) => y},
    {X: ([x, y, z]) => -z, Y: ([x, y, z]) => -y, Z: ([x, y, z]) => -x},
];

function orient(points, {X, Y, Z}) {
    return points.map(p => [X(p), Y(p), Z(p)]);
}

const scanners = input.map(([, name, coords]) => {
    let beacons = coords.split('\n').map(line => line.split(',').map(toNumber));
    return ({
        name,
        observations: orientations.map(orientation => orient(beacons, orientation))
    });
});


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */


function add([a, b, c], [x, y, z]) {
    return [a + x, b + y, c + z];
}

function sub([a, b, c], [x, y, z]) {
    return [a - x, b - y, c - z];
}

function found(scanner, position, orientIndex) {
    log(scanner.name, 'placed at', position, 'with orientation', orientIndex)
    scanner.position = position;
    scanner.beacons = scanner.observations[orientIndex];
}

function alignScanners({beacons, position, name}, unknown) {
    for (let orientIndex in orientations) {
        let probes = unknown.observations[orientIndex];
        for (let templateRelative of beacons) {
            for (let testRelative of probes) {
                let diff = sub(templateRelative, testRelative);
                if (hasTwelveMatches(beacons, probes, diff)) {
                    log('via', name, 'found:');
                    found(unknown, add(position, diff), orientIndex);
                    return true;
                }
            }
        }
    }
}

function hasTwelveMatches(A, B, [dx, dy, dz]) {
    return A.filter(([a, b, c]) =>
        B.some(([x, y, z]) =>
            a === x + dx && b === y + dy && c === z + dz
        )
    ).length >= 12;
}

found(scanners[0], [0, 0, 0], 0);

for (let newlyFound = [scanners[0]]; newlyFound.length > 0;) {
    newlyFound = newlyFound.flatMap(known =>
        scanners.filter(unknown => !unknown.position && alignScanners(known, unknown))
    );
}

const uniqueBeacons = new Set(scanners.flatMap(({beacons, position}) => beacons.map(p => add(p, position).join())));

log('solution #1', uniqueBeacons.size);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


function manhattan([a, b, c], [x, y, z]) {
    return Math.abs(a - x) + Math.abs(b - y) + Math.abs(c - z)
}

let maxDist = 0;
for (let {position: a} of scanners) {
    for (let {position: b} of scanners) {
        if (a === b) continue;
        maxDist = Math.max(maxDist, manhattan(a, b));
    }
}

log('solution #2:', maxDist);
