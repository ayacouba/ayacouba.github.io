document.addEventListener("DOMContentLoaded", () => {
  const playerOptions = document.querySelectorAll(".throw");
  const computerChoiceDisplay = document.getElementById("computer-choice");
  const resultText = document.getElementById("result-text");
  const playAgainButton = document.getElementById("play-again");
  const resetScoreButton = document.getElementById("reset-score");
  const winsDisplay = document.getElementById("wins");
  const lossesDisplay = document.getElementById("losses");
  const tiesDisplay = document.getElementById("ties");

  let wins = 0;
  let losses = 0;
  let ties = 0;

  // Function to handle the player's choice
  playerOptions.forEach((option) => {
    option.addEventListener("click", function () {
      playerOptions.forEach((option) => (option.dataset.selected = "false"));
      this.dataset.selected = "true";
      playGame(this.dataset.throw);
    });
  });

  // Function to play the game
  function playGame(playerThrow) {
    highlightPlayerChoice(playerThrow);
    shuffleComputerChoice();
  }

  // Function to highlight the player's choice
  function highlightPlayerChoice(playerThrow) {
    playerOptions.forEach((option) => {
      if (option.dataset.throw === playerThrow) {
        option.style.border = "3px solid red";
      } else {
        option.style.border = "";
      }
    });
  }

  // Function to shuffle the computer's choice images
  function shuffleComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let count = 0;
    const intervalId = setInterval(() => {
      computerChoiceDisplay.src = `images/${choices[count]}.png`;
      count = (count + 1) % choices.length;
    }, 500);

    setTimeout(() => {
      clearInterval(intervalId);
      const computerThrow = computerRandomChoice();
      computerChoiceDisplay.src = `images/${computerThrow}.png`;
      computerChoiceDisplay.dataset.throw = computerThrow;
      decideWinner(playerOptions[0].dataset.throw, computerThrow);
    }, 3000);
  }

  // Function to handle the computer's random choice
  function computerRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Function to decide the winner
  function decideWinner(playerThrow, computerThrow) {
    if (playerThrow === computerThrow) {
      resultText.textContent = "RESULTS: It's a tie!";
      ties++;
    } else if (
      (playerThrow === "rock" && computerThrow === "scissors") ||
      (playerThrow === "paper" && computerThrow === "rock") ||
      (playerThrow === "scissors" && computerThrow === "paper")
    ) {
      resultText.textContent = "RESULTS: You win!";
      wins++;
    } else {
      resultText.textContent = "RESULTS: You lose!";
      losses++;
    }

    // Update the scoreboard
    updateScoreboard();
    // Show the play again button
    playAgainButton.style.display = "block";
    resetScoreButton.style.display = "block";
  }

  // Function to update the scoreboard
  function updateScoreboard() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    tiesDisplay.textContent = ties;
  }

  playAgainButton.addEventListener("click", () => {
    playerOptions.forEach((option) => (option.dataset.selected = "false"));
    computerChoiceDisplay.src = "images/question-mark.png";
    resultText.textContent = "RESULTS:";
    playAgainButton.style.display = "none";
    shuffleComputerChoice();
  });

  resetScoreButton.addEventListener("click", () => {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScoreboard();
  });

  shuffleComputerChoice();
});
