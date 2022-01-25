'use strict';
const PACMAN = '😷';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 5,
      j: 7,
    },
    isSuper: false,
  };

  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  countFood--;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  if (!nextLocation) return;
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // return if cannot move
  if (nextCell === WALL) return;
  // hitting a ghost?  call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      killGhost(nextLocation);
    } else {
      gameStatus(true);
      return;
    }
  }
  if (nextCell === FOOD) {
    updateScore(1);
    countFood--;
    console.log(countFood);
    if (countFood === 0) {
      updatePacman(nextLocation);
      gameStatus(false);
      return;
    }
  }
  if (nextCell === CHERRY) {
    updateScore(15);
  }
  if (nextCell === SUPERFOOD && gPacman.isSuper) return;
  if (nextCell === SUPERFOOD) {
    gPacman.isSuper = true;
    updateScore(1);
    setTimeout(function () {
      gPacman.isSuper = false;
      gGhosts.push(...gGhostsDead);
      gGhostsDead = [];
    }, 5000);
  }

  // moving from corrent position:
  updatePacman(nextLocation);
}

function updatePacman(nextLocation) {
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);

  // Move the pacman to new location
  // update the model
  gPacman.location = {
    i: nextLocation.i,
    j: nextLocation.j,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
  // console.log('keyboardEvent.code', keyboardEvent.code)
  // figure out nextLocation
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
