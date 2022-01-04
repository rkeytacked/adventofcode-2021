#!/usr/bin/env node
const {log, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  23 * *
 * * * * * * * */

const input = readLines('../inputs/23.txt', split(/[ #]+/g));
const upperFloor = input[2].slice(1, 5);
const lowerFloor = input[3].slice(1, 5);
const nrRooms = 4;

/**
 * Distances from the top floor to hallway positions,
 * modelled as pair [targetPosition, distance],
 * sorted by distance.
 * Array key is the starting room position (0..3).
 * Each item: first entry to the left, second entry to the right.
 *
 * Important: Not every hallway step is useful.
 * Hence, we can skip the ones in front of the rooms, ending up with only 7 places (0..6).
 */
const distances = [
    [[[1, 2], [0, 3]], [[2, 2], [3, 4], [4, 6], [5, 8], [6, 9]]],
    [[[2, 2], [1, 4], [0, 5]], [[3, 2], [4, 4], [5, 6], [6, 7]]],
    [[[3, 2], [2, 4], [1, 6], [0, 7]], [[4, 2], [5, 4], [6, 5]]],
    [[[4, 2], [3, 4], [2, 6], [1, 8], [0, 9]], [[5, 2], [6, 3]]],
]

/**
 * Characteristics of the amphipods.
 */
const amphipods = {
    A: {energy: 1, target: 0},
    B: {energy: 10, target: 1},
    C: {energy: 100, target: 2},
    D: {energy: 1000, target: 3},
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

/**
 * Global min costs (to cut expensive paths).
 */
let minimum = 1000000;

/**
 * Cache to store cheapest costs to achieve a specific state.
 */
let visited = {};

function isAllFinished(floors) {
    return floors.every(floor => {
        if (floor.isFinished === false) return false;
        return floor.isFinished = floor.isFinished || floor.every((spot, index) => spot && amphipods[spot].target === index);
    });
}

function isRoomFinishedBelow(floors, roomIndex, below = 0) {
    for (let depth = below; depth < floors.length; depth++) {
        if (amphipods[floors[depth][roomIndex]].target !== roomIndex) {
            return false;
        }
    }
    return true;
}

function stepOutOfRoom(floors, depth, hallway, costs, roomIndex) {
    let amphipod = floors[depth][roomIndex];
    for (let directions of distances[roomIndex]) {
        for (let [hallwayPosition, dist] of directions) {
            if (hallway[hallwayPosition]) break;
            let newFloor = floors[depth].slice();
            newFloor[roomIndex] = null;
            newFloor.isFinished = false;
            let newHallway = hallway.slice();
            newHallway[hallwayPosition] = amphipod;
            let newCosts = costs + (dist + depth) * amphipods[amphipod].energy;
            let newFloors = floors.slice();
            newFloors[depth] = newFloor;
            move(newFloors, newHallway, newCosts);
        }
    }
}

function stepIntoRoom(floors, depth, hallway, costs, roomIndex) {
    for (let directions of distances[roomIndex]) {
        for (let [hallwayPosition, dist] of directions) {
            let amphipod = hallway[hallwayPosition];
            if (amphipod) {
                if (amphipods[amphipod].target === roomIndex) {
                    let newFloor = floors[depth].slice();
                    newFloor[roomIndex] = amphipod;
                    let newHallway = hallway.slice();
                    newHallway[hallwayPosition] = null;
                    let newCosts = costs + (dist + depth) * amphipods[amphipod].energy;
                    let newFloors = floors.slice();
                    newFloors[depth] = newFloor;
                    move(newFloors, newHallway, newCosts);
                }
                break;
            }
        }
    }
}

function hasVisitedCheaper(floors, hallway, costs) {
    let key = '';
    for (let floor of floors) {
        for (let x of floor) {
            key += x || '.'
        }
    }
    for (let x of hallway) {
        key += x || '.'
    }
    if (visited[key] && visited[key] <= costs) {
        return true;
    }
    visited[key] = costs;
}

function move(floors, hallway = new Array(7), costs = 0) {
    if (hasVisitedCheaper(floors, hallway, costs) || costs >= minimum) {
        return;
    }
    if (isAllFinished(floors)) {
        minimum = costs;
        log('found solution with', costs, 'costs.');
        return;
    }
    position: for (let position = 0; position < nrRooms; position++) {
        for (let depth = 0; depth < floors.length; depth++) {
            if (floors[depth][position]) {
                if (!isRoomFinishedBelow(floors, position, depth)) {
                    stepOutOfRoom(floors, depth, hallway, costs, position);
                } else if (depth > 0) {
                    stepIntoRoom(floors, depth - 1, hallway, costs, position);
                }
                continue position;
            }
        }
        stepIntoRoom(floors, floors.length - 1, hallway, costs, position);
    }
}

log('Checking 2 layers deep.')
move([upperFloor, lowerFloor]);
log('solution #1', minimum);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

// reset global minimum and cache
minimum = 1000000;
visited = {};

let extraFloors = [
    ['D', 'C', 'B', 'A'],
    ['D', 'B', 'A', 'C']
];

log('Checking 4 layers deep.')

move([upperFloor, ...extraFloors, lowerFloor]);
log('solution #2', minimum);
