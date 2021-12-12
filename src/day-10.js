#!/usr/bin/env node
const {log, median, readLines, sum} = require("./common");

/* * * * * * * *
 * * DAY  10 * *
 * * * * * * * */

const input = readLines('../inputs/10.txt');

const braces = {')': '(', ']': '[', '}': '{', '>': '<'}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findFirstErrorScore(line) {
    const errorScores = {')': 3, ']': 57, '}': 1197, '>': 25137}
    const stack = [];
    for (let c of [...line]) {
        switch (c) {
            case '(':
            case '[':
            case '{':
            case '<':
                stack.push(c);
                break;
            case ')':
            case ']':
            case '}':
            case '>':
                if (stack.pop() !== braces[c]) {
                    return errorScores[c];
                }
        }
    }
    return 0;
}

const scores = input.map(findFirstErrorScore);
log('solution #1:', sum(scores));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function completionScore(stack) {
    const points = {'(': 1, '[': 2, '{': 3, '<': 4}
    let score = 0;
    while (stack.length) {
        score = score * 5 + points[stack.pop()]
    }
    return score;
}

function findIncompleteStackScore(line) {
    const stack = [];
    for (let c of [...line]) {
        switch (c) {
            case '(':
            case '[':
            case '{':
            case '<':
                stack.push(c);
                break;
            case ')':
            case ']':
            case '}':
            case '>':
                if (stack.pop() !== braces[c]) {
                    return;
                }
        }
    }
    return completionScore(stack);
}

let totalScores = input.map(findIncompleteStackScore).filter(x => x);
log('solution #2:', median(totalScores));
