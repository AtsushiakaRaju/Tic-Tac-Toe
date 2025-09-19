// ===== Scene Elements =====
const sceneMode = document.getElementById("scene-mode");
const sceneNames = document.getElementById("scene-names");
const sceneGame = document.getElementById("scene-game");

// ===== Button & Form Elements =====
const btnPvp = document.getElementById("btn-pvp");
const btnBot = document.getElementById("btn-bot");
const nameForm = document.getElementById("name-form");
const nameX = document.getElementById("name-x");
const nameO = document.getElementById("name-o");
const playerOWrap = document.getElementById("player-o-wrapper");

// ===== Game Screen Elements =====
const boardElement = document.getElementById("board");
const statusMsg = document.getElementById("status-message");
const restartBtn = document.getElementById("restart-button");
const backHomeBtn = document.getElementById("back-home");

// ===== Game State =====
let boardState, currentPlayer, isGameActive;
let gameMode, playerXName, playerOName;
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// ===== Scene Navigation =====
function show(scene) {
  // Hide all scenes
  [sceneMode, sceneNames, sceneGame].forEach(s => s.classList.remove("active"));
  // Show the requested scene
  scene.classList.add("active");
}

btnPvp.addEventListener("click", () => {
  gameMode = "pvp";
  playerOWrap.style.display = "block";
  nameO.required = true; // Player 2 name is required in PvP
  show(sceneNames);
});

btnBot.addEventListener("click", () => {
  gameMode = "bot";
  playerOWrap.style.display = "none";
  nameO.required = false; // Player 2 name is not required vs Bot
  show(sceneNames);
});

nameForm.addEventListener("submit", e => {
  e.preventDefault();
  playerXName = nameX.value.trim() || "Player 1";
  playerOName = gameMode === "pvp" ? (nameO.value.trim() || "Player 2") : "Bot";
  startGame();
  show(sceneGame);
});

backHomeBtn.addEventListener("click", () => {
  nameForm.reset(); // Clear names when going home
  show(sceneMode);
});


// ===== Game Logic =====
function startGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  isGameActive = true;
  boardElement.innerHTML = "";
  updateStatus();

  // Create 9 cells for the board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleCellClick(i, cell));
    boardElement.appendChild(cell);
  }
}

function updateStatus() {
  const name = currentPlayer === "X" ? playerXName : playerOName;
  // Use specific classes for styling player names
  const playerClass = currentPlayer === "X" ? "player-x" : "player-o";
  statusMsg.innerHTML = `<span class="${playerClass}">${name}</span>'s Turn`;
}

function handleCellClick(idx, cell) {
  if (!isGameActive || boardState[idx]) return;
  makeMove(idx, cell, currentPlayer);

  // If the game is still active and it's the bot's turn
  if (isGameActive && gameMode === "bot" && currentPlayer === "O") {
    // Add a slight delay for the bot's move to feel more natural
    setTimeout(botTurn, 500);
  }
}

function makeMove(idx, cell, player) {
  boardState[idx] = player;
  cell.textContent = player;
  cell.classList.add(player.toLowerCase()); // Adds 'x' or 'o' class for styling

  const win = checkWinner(player);
  if (win) {
    highlight(win);
    const winnerName = player === "X" ? playerXName : playerOName;
    statusMsg.innerHTML = `🎉 <span class="${player.toLowerCase()==='x'?'player-x':'player-o'}">${winnerName}</span> Wins! 🎉`;
    isGameActive = false;
    return;
  }
  if (!boardState.includes("")) {
    statusMsg.textContent = "🤝 It's a Tie! 🤝";
    isGameActive = false;
    return;
  }
  
  currentPlayer = (player === "X") ? "O" : "X";
  // Only update status if the game is still active
  if(isGameActive) {
      updateStatus();
  }
}

function checkWinner(p) {
  return winCombos.find(([a, b, c]) =>
    boardState[a] === p && boardState[b] === p && boardState[c] === p
  );
}

function highlight(combo) {
  combo.forEach(i => {
    const cell = boardElement.querySelector(`[data-index='${i}']`);
    cell.classList.add("winning-cell", currentPlayer.toLowerCase());
  });
}

// ===== Smart Bot Logic =====
function botTurn() {
  if (!isGameActive) return;

  // 1. Check if Bot can win in the next move
  let move = findBestMove("O");
  // 2. Check if Player is about to win, and block them
  if (move === null) move = findBestMove("X");
  // 3. Take the center square if it's available
  if (move === null && boardState[4] === "") move = 4;
  // 4. Take one of the corners if available
  if (move === null) {
      const corners = [0, 2, 6, 8].filter(i => boardState[i] === "");
      if(corners.length > 0) move = corners[Math.floor(Math.random() * corners.length)];
  }
  // 5. Take any remaining empty square
  if (move === null) {
      const available = boardState.map((v, i) => v === "" ? i : null).filter(i => i !== null);
      if(available.length > 0) move = available[Math.floor(Math.random() * available.length)];
  }
  
  if(move !== null) {
    const cell = boardElement.querySelector(`[data-index='${move}']`);
    makeMove(move, cell, "O");
  }
}

function findBestMove(player) {
  for (const [a, b, c] of winCombos) {
    const line = [boardState[a], boardState[b], boardState[c]];
    if (line.filter(v => v === player).length === 2 && line.includes("")) {
      return [a, b, c][line.indexOf("")];
    }
  }
  return null;
}

// ===== Restart Button =====
restartBtn.addEventListener("click", startGame);

// Start on the mode selection screen initially
show(sceneMode);