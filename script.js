const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restartButton');
const turnIndicator = document.getElementById('turn-indicator');

const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const resetScoreBtn = document.getElementById('resetScore');

resetScoreBtn.addEventListener('click', () => {
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;
  updateScoreboard();
});
function updateScoreboard() {
  document.getElementById('score-x').innerText = scoreX;
  document.getElementById('score-o').innerText = scoreO;
  document.getElementById('score-draw').innerText = scoreDraw;
}

startGame();

updateScoreboard();

restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.innerText = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.style.display = 'none';
   updateTurnIndicator();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    updateTurnIndicator();
  }
}

function endGame(draw) {
  if (draw) {
    messageText.innerText = '🌙✨ Deu velha! Empate! ✨🌙';
  } else {
    messageText.innerText = `🌟✨ ${oTurn ? 'O' : 'X'} venceu! ✨🌟`;
  }
  message.style.display = 'block';
  if (draw) {
  scoreDraw++;
} else {
  if (oTurn) scoreO++;
  else scoreX++;
}
updateScoreboard();
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
}

function swapTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
function updateTurnIndicator() {
  const player = oTurn ? 'O' : 'X';
  turnIndicator.innerText = `É a vez de: ${player}`;
}

// 🌌 FUNDO ANIMADO COM ESTRELAS PISCANDO
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      alpha: Math.random(),
      delta: Math.random() * 0.02 + 0.005 // velocidade do piscar
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.delta = -star.delta; // inverte quando atinge limite
    }

    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}
animateStars();

