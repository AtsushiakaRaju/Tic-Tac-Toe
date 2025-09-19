# Tic-Tac-Toe — Web & C++ Versions

A simple yet fun **Tic-Tac-Toe** game built in two flavors:
1. **Web version (HTML/CSS/JS)** – Playable on any modern browser & device.
2. **Original C++ version** – Terminal-based game located at
   `gamedev010/game1.cpp`.

---

## 🎮 Web Version

### ▶️ Live Demo
(https://atsushiakaraju.github.io/Tic-Tac-Toe/)

### Features
- Two Modes:
  - Player vs Player (PvP) – Two human players on the same device.
  - Player vs Bot – Challenge a smart bot with basic strategy.
- Three Scenes UI:
  1. Mode Selection – Choose PvP or PvBot.
  2. Player Name Input – Enter player names (single name for PvBot).
  3. Game Board – Classic 3x3 Tic-Tac-Toe grid.
- Clean, mobile-friendly design using only HTML, CSS, and JavaScript.

### How to Run Locally
1. Clone the repository:
   git clone https://github.com/AtsushiakaRaju/Tic-Tac-Toe.git
2. Open `index.html` in any modern browser.

---

## 💻 Original C++ Version

The first implementation of this game is a terminal-based C++ program.

File: `gamedev010/game1.cpp`

### How to Compile & Run
g++ gamedev010/game1.cpp -o game1
./game1

### Features
- Player vs Player and Player vs Bot modes.
- Random bot moves using `<random>` library.
- Simple text-based board with coordinate input.

---

## 🛠️ Tech Stack
- Web Version: HTML, CSS, JavaScript
- Original Version: C++

---

## 📂 Project Structure
.
├── index.html       # Web game UI
├── style.css        # Web game styling
├── script.js        # Web game logic
└── gamedev010/
    └── game1.cpp    # Original C++ terminal game


---

