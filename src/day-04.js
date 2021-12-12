#!/usr/bin/env node
const {log, readLines, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  04 * *
 * * * * * * * */

const lines = readLines('../inputs/04.txt');
const numbers = lines.shift().split(',').map(toNumber);

function readBoards(lines) {
    const boards = [];
    let board = null;
    for (let line of lines) {
        if (line) {
            board.push(line.trim().split(/\s+/g).map(toNumber));
        } else {
            boards.push(board = []);
        }
    }
    return boards;
}

const boards = readBoards(lines);
const indexes = [...boards[0].keys()];

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function prepareBoards(boards) {
    for (let board of boards) {
        board.rowHits = [];
        board.colHits = [];
        board.markedSum = 0;
        board.won = false;
    }
}

function markNumber(board, number) {
    for (let i of indexes) {
        for (let j of indexes) {
            if (board[i][j] === number) {
                board.rowHits[i] = 1 + (board.rowHits[i] || 0);
                board.colHits[j] = 1 + (board.colHits[j] || 0);
                board.markedSum += number;
                if (board.rowHits[i] >= indexes.length || board.colHits[j] >= indexes.length) {
                    return board.won = true;
                }
            }
        }
    }
}

function playBingo(boards, numbers) {
    prepareBoards(boards);
    for (let num of numbers) {
        for (let board of boards) {
            if (markNumber(board, num)) {
                return [board, num];
            }
        }
    }
}

function unmarkedSum(board) {
    let totalSum = sum(board.map(sum));
    return totalSum - board.markedSum;
}

const [winner1, number1] = playBingo(boards, numbers);
let unmarkedSum1 = unmarkedSum(winner1);
log('solution #1:', number1, '*', unmarkedSum1, '=', number1 * unmarkedSum1);


/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function playBingoLast(boards, numbers) {
    prepareBoards(boards);
    let countWinners = 0;
    for (let num of numbers) {
        for (let board of boards) {
            if (!board.won && markNumber(board, num)) {
                countWinners++;
                if (countWinners >= boards.length) {
                    return [board, num];
                }
            }
        }
    }
}

const [winner2, number2] = playBingoLast(boards, numbers);
let unmarkedSum2 = unmarkedSum(winner2);
log('solution #2:', number2, '*', unmarkedSum2, '=', number2 * unmarkedSum2);
