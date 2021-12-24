#!/usr/bin/env node
const {log, associate, readLines, split, sum, prod} = require("./common");

/* * * * * * * *
 * * DAY  22 * *
 * * * * * * * */

const input = readLines('../inputs/22.txt', split(' '));
const steps = input.map(([onoff, coords]) => (
    {
        toggleOn: onoff === 'on',
        ranges: associate(coords.split(','), range => {
            const [dimension, from, to] = range.split(/=|\.\./g);
            return [dimension, {from: Number(from), to: Number(to) + 1}];
        })
    }
));


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isDisjoint(rangesA, rangesB) {
    for (let dimension in rangesA) {
        if (rangesA[dimension].from >= rangesB[dimension].to
            || rangesB[dimension].from >= rangesA[dimension].to) {
            return true;
        }
    }
    return false;
}


let cuboids = [];
loopSteps: for (let step; (step = steps.shift());) {
    for (let i = 0; i < cuboids.length; i++) {
        const cuboid = cuboids[i];
        if (isDisjoint(step.ranges, cuboid.ranges)) {
            continue;
        }
        for (let dimension in step.ranges) {
            let stepRange = step.ranges[dimension];
            let cuboidRange = cuboid.ranges[dimension];

            if (stepRange.from < cuboidRange.from) {
                // split step into two steps along this dimension
                steps.unshift({
                    ...step,
                    ranges: {...step.ranges, [dimension]: {...stepRange, to: cuboidRange.from}}
                });
                stepRange = step.ranges[dimension] = {...stepRange, from: cuboidRange.from};
            } else if (stepRange.from > cuboidRange.from) {
                // split cuboid into two cuboids along this dimension
                cuboids.push({
                    ...cuboid,
                    ranges: {...cuboid.ranges, [dimension]: {...cuboidRange, to: stepRange.from}}
                })
                cuboidRange = cuboid.ranges[dimension] = {...cuboidRange, from: stepRange.from};
            }
            // stepRange.from === cuboidRange.from

            if (stepRange.to > cuboidRange.to) {
                // split step into two steps along this dimension
                steps.unshift({
                    ...step,
                    ranges: {...step.ranges, [dimension]: {...stepRange, from: cuboidRange.to}}
                });
                stepRange = step.ranges[dimension] = {...stepRange, to: cuboidRange.to};
            } else if (stepRange.to < cuboidRange.to) {
                // split cuboid into two cuboids along this dimension
                cuboids.push({
                    ...cuboid,
                    ranges: {...cuboid.ranges, [dimension]: {...cuboidRange, from: stepRange.to}}
                })
                cuboidRange = cuboid.ranges[dimension] = {...cuboidRange, to: stepRange.to};
            }
            // stepRange.to === cuboidRange.to
        }
        // all dimension ranges equal
        if (!step.toggleOn) {
            // remove empty cuboid
            cuboids.splice(i--, 1);
        }
        // step done here since all cuboids are disjoint
        continue loopSteps;
    }
    if (step.toggleOn) {
        cuboids.push(step);
    }
}

log('processed', input.length, 'steps into', cuboids.length, 'disjoint cuboids');


function countCubes(cuboids) {
    return sum(cuboids.map(({ranges}) => prod(Object.values(ranges).map(({from,to}) => to - from))));
}

let initializationCuboids = cuboids.filter(({ranges}) =>
    Object.values(ranges).every(({from,to}) => from >= -50 && to <= 51)
);

log('solution #1:', countCubes(initializationCuboids));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #1:', countCubes(cuboids));
