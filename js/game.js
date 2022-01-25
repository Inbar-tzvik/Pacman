'use strict';
const WALL = '⬜';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '🍭';
const CHERRY = '🍒';
var countFood;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
var gIntervalCherry;

function init() {
  // console.log('Hello')
  countFood = 0;
  gGame.score = 0;
  document.querySelector('h2 span').innerText = '0';
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  // console.table(gBoard)
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  displayBttonModal('none', '');
  gIntervalCherry = setInterval(placeCherry, 15000, CHERRY);
}

function buildBoard() {
  var SIZE = 12;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 || (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      } else if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)
      ) {
        board[i][j] = SUPERFOOD;
      } else {
        board[i][j] = FOOD;
        countFood++;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  // update model and dom
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameStatus(state) {
  var text = state ? 'Game over-you lost' : 'You win-Good job';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);

  gIntervalGhosts = null;
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);
  displayBttonModal('block', text);
}

function displayBttonModal(cont, cont2) {
  document.querySelector('button').style.display = cont;
  document.querySelector('h1').innerText = cont2;
}
function getEmptyCells() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var currCell = gBoard[i][j];
      if (currCell === EMPTY) emptyCells.push({ i, j });
    }
  }
  return emptyCells;
}
function placeCherry(element) {
  var emptyCells = getEmptyCells();
  if (!emptyCells.length) return;
  var randIdx = getRandomIntInclusive(0, emptyCells.length - 1);
  var currPos = emptyCells[randIdx];
  gBoard[currPos.i][currPos.j] = element;
  renderCell(currPos, element);
}
