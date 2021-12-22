#!/usr/bin/env node
const {log, associate, readCharArrays, readLines, readSingletonMaps, split, sum, toNumber, min, max, sort, prod, median} = require("./common");

/* * * * * * * *
 * * DAY  21 * *
 * * * * * * * */

const input = readLines('../inputs/21.txt').map(line => line.replace(/^.*: /, ''));
const startPositions = input.map(toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function DeterministicDie(faces) {
    let lastNumber = 0;
    let timesRolled = 0;

    function roll() {
        lastNumber = (lastNumber % faces) + 1;
        timesRolled++;
        return lastNumber;
    }

    this.rollThree = function () {
        return roll() + roll() + roll();
    }
    this.getTimesRolled = function () {
        return timesRolled;
    }
}

function playDeterministicGame(startPositions, die, target) {
    let positions = startPositions.slice();
    let points = startPositions.map(() => 0);
    while (true) {
        for (let index in positions) {
            let newPos = (positions[index] + die.rollThree() - 1) % 10 + 1;
            let newPoints = points[index] + newPos;
            if (newPoints >= target) {
                return {
                    winner: index,
                    points
                };
            }
            positions[index] = newPos;
            points[index] = newPoints;
        }
    }
}

const die100 = new DeterministicDie(100);
const {winner, points} = playDeterministicGame(startPositions, die100, 1000);
const loser = 1 - winner;

log('deterministic points', points);
log('Player', 1 * winner + 1, 'wins after', die100.getTimesRolled(), 'dice rolls.');
log('solution #1', points[loser], '*', die100.getTimesRolled(), '=', points[loser] * die100.getTimesRolled());


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function DiracDie(faces) {
    const options = {};
    for (let x = 1; x <= faces; x++) {
        for (let y = 1; y <= faces; y++) {
            for (let z = 1; z <= faces; z++) {
                const nr = x+y+z
                options[nr] = (options[nr]||0)+1;
            }
        }
    }
    this.rollThree = function(callback) {
        for (let nr in options) {
            callback(Number(nr), options[nr]);
        }
    }
}

function playDiracGame(startPositions, die, target) {
    let wins = startPositions.map(() => 0);

    function playRound(universes) {
        let newUniverses = {};

        function movePlayers(players, countUniverses, activePlayerIndex = 0, statePrefix = '') {
            if (activePlayerIndex >= players.length) {
                newUniverses[statePrefix] = (newUniverses[statePrefix] || 0) + countUniverses;
                return;
            }
            const [pos, points] = players[activePlayerIndex].split(',').map(toNumber);
            die.rollThree((option, count) => {
                let newPos = (pos + option - 1) % 10 + 1;
                let newCount = count * countUniverses;
                let newPoints = points + newPos;
                if (newPoints >= target) {
                    wins[activePlayerIndex] += newCount;
                } else {
                    movePlayers(players, newCount, activePlayerIndex + 1, (statePrefix && statePrefix+':') + newPos + ',' + newPoints);
                }
            });
        }

        for (let universe in universes) {
            let playerStates = universe.split(':');
            movePlayers(playerStates, universes[universe]);
        }

        return newUniverses;
    }

    let initialState = startPositions.map(pos => '' + pos + ',0').join(':');
    let universes = {[initialState]: 1};
    while (Object.keys(universes).length > 0) {
        universes = playRound(universes);
    }
    return wins;
}


const diracDie3 = new DiracDie(3);
let wins = playDiracGame(startPositions, diracDie3,  21);
let maxWins = max(wins);

log('winning dirac universes', wins);
log('solution #2:', 'Player', wins.indexOf(maxWins)+1, '=>', maxWins);
