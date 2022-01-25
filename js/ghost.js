'use strict';
const GHOST = '&#9781;';
var gGhosts;
var gIntervalGhosts;
var gGhostsDead = [];

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    color: getRandomColor(),
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  // 3 ghosts and an interval
  gGhosts = [];
  for (var i = 0; i < 3; i++) {
    createGhost(board);
  }

  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
  // loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];

    moveGhost(ghost);
  }
}

function moveGhost(ghost) {
  // figure out moveDiff, nextLocation, nextCell
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;
  if (nextCell === CHERRY) return;
  // hitting a pacman?  call gameOver
  if (nextCell === PACMAN) {
    gameStatus(true);
    return;
  }
  if (nextCell === PACMAN && gPacman.isSuper) return;
  // moving from corrent position:
  // update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);
  // Move the ghost to new location
  // update the model
  ghost.location = {
    i: nextLocation.i,
    j: nextLocation.j,
  };
  ghost.currCellContent = nextCell;
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getGhostHTML(ghost) {
  var color = gPacman.isSuper ? 'blue' : ghost.color;
  return `<span style="color:${color};">${GHOST}</span>`;
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(1, 100);
  if (randNum <= 25) {
    return { i: 0, j: 1 };
  } else if (randNum <= 50) {
    return { i: -1, j: 0 };
  } else if (randNum <= 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function killGhost(location) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
      var currCellContent = gGhosts[i].currCellContent;
      gGhosts[i].currCellContent = EMPTY;
      gGhostsDead.push(...gGhosts.splice(i, 1));

      //   gBoard[location.i][location.j] = gGhosts[i].currCellContent;
      //   renderCell(gGhosts[i].location, gGhosts[i].currCellContent);
    }
  }
  if (currCellContent === FOOD) {
    updateScore(1);
    countFood--;
  }
}
