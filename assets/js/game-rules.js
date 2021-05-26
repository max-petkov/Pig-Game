"use strict";

const rollDice = document.getElementById("rollDice");
const holdScore = document.getElementById("holdScore");
const newGame = document.getElementById("newGame");
const dice = document.querySelector("img");
let activePlayer = 1;
let diceScore = 0;
let holdCurrentScore = 0;

const switchPlayer = function () {
  diceScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  document.getElementById(`diceScoreP${activePlayer}`).textContent = diceScore;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
};
const displayWinner = function () {
  document
    .getElementById(`player${activePlayer}`)
    .classList.add("player-winner");
  document.getElementById(`holdScoreP${activePlayer}`).style.fontSize =
    "2.5rem";
  document.getElementById(`holdScoreP${activePlayer}`).textContent = "WINNER!";
};
const displayNewGameBtn = function () {
  dice.classList.add("d-none");
  rollDice.classList.add("d-none");
  holdScore.classList.add("d-none");
  newGame.classList.remove("d-none");
};

// Roll The Dice
rollDice.addEventListener("click", function () {
  let currentScore = document.getElementById(`diceScoreP${activePlayer}`);

  // Display dice based on randomNumber
  let randomNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `assets/img/dice-${randomNumber}.png`;
  dice.classList.remove("d-none");

  if (randomNumber > 1) {
    diceScore += randomNumber;
    currentScore.textContent = diceScore;
  } else {
    // Switch player if dice is 1
    switchPlayer();
    currentScore.textContent = 0;
  }
});

// Hold Your Dice Score
holdScore.addEventListener("click", function () {
  let playerScore = document.getElementById(`holdScoreP${activePlayer}`);
  let currentScore = document.getElementById(`diceScoreP${activePlayer}`);
  playerScore.textContent = diceScore + Number(playerScore.textContent);

  if (Number(playerScore.textContent) >= 100) {
    displayWinner();
    displayNewGameBtn();
  } else {
    // Switch player when player hold the current score
    switchPlayer();
    currentScore.textContent = 0;
    dice.classList.add("d-none");
  }
});

// Start New Game
newGame.addEventListener("click", function () {
  newGame.classList.add("d-none");
  rollDice.classList.remove("d-none");
  holdScore.classList.remove("d-none");
  diceScore = 0;
  holdCurrentScore = 0;
  for (let i = 1; i < 3; i++) {
    document.getElementById(`holdScoreP${i}`).textContent = 0;
    document.getElementById(`diceScoreP${i}`).textContent = 0;
    document.getElementById(`player${i}`).classList.remove("player-winner");
    document.getElementById(`holdScoreP${i}`).style.fontSize = "4rem";
  }
});
