// Sets the timer to 0
let timer = 0;
// Sets the interval to 0
let intervalId = 0;
// Sets the score to 0
let score = 0;

let sectionIndex = 1;
const answerKey = [3, 3, 4, 3, 4];
let scoresArray = JSON.parse(localStorage.getItem("scores")) || [];

const setSectionIndex = (n) => {
  sectionIndex = n;
  setSection(sectionIndex);
};

const setSection = (n) => {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {
    sectionIndex = 1;
  }
  if (n < 1) {
    sectionIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[sectionIndex - 1].style.display = "block";
};

setSection(sectionIndex);

// This function will start the game
const startGame = () => {
  score = 0;

  setSectionIndex(2);

  timer = 90;

  // Update the initial timer value on the page
  document.getElementById("time").innerHTML = timer;

  // This will start the timer
  intervalId = window.setInterval(() => {
    // This will decrement the timer by 1

    timer--;

    document.getElementById("time").innerHTML = timer;

    // If the timer is 0, stop the timer and show the final score
    if (timer === 0) {
      window.clearInterval(intervalId);

      setTimeout(() => {
        alert("Time is up!");
        document.getElementById(
          "score"
        ).innerHTML = `Your final score is: ${score}`;
        setSectionIndex(7);
      }, 10);
    }
  }, 1000);
};

// This function will check the answer and move to the next question
const checkAnswer = (response) => {
  var answer = document.getElementById("answerResponse");

  if (response.answer === answerKey[response.question - 1]) {
    answer.textContent = "Correct!";
    // If the answer is correct, the score will go up by 1
    score++;
  } else {
    answer.textContent = "Wrong!";

    if (timer > 10) {
      timer -= 5;
    } else {
      timer = 1;
      setTimeout(() => {}, 1000);
    }
  }

  if (response.question === 5) {
    document.getElementById("score").innerHTML = `Your final score is ${score}`;
    window.clearInterval(intervalId);
  }

  setSectionIndex(response.question + 2);

  setTimeout(() => {
    answer.textContent = "";
  }, 2000);
};

// This function will display the high scores
const showScores = () => {
  let highScoreOutput = "";

  scoresArray.sort((a, b) => {
    return b.score - a.score;
  });

  scoresArray.forEach((highScore, index) => {
    highScoreOutput += `<div class="high-score-output">${index + 1}. ${
      highScore.initials
    } - ${highScore.score}</div>`;
  });

  document.getElementById("highscores").innerHTML = highScoreOutput;

  setSectionIndex(8);
};

// This function will save the score to local storage
const setScore = (event) => {
  event.preventDefault();
  const initials = document.getElementById("initials").value;
  const newScore = {
    initials: initials.toUpperCase(),
    score: score,
  };

  scoresArray.push(newScore);

  localStorage.setItem("scores", JSON.stringify(scoresArray));

  showScores();
};

// This will reset the score and timer to zero and move to the start section
const goBack = () => {
  timer = 0;
  score = 0;

  // This will clear the timer
  document.getElementById("time").innerHTML = timer;

  setSectionIndex(1);
};

const clearScores = () => {
  scoresArray = [];
  localStorage.removeItem("scores");
  // This will clear the high scores from the page
  document.getElementById("highscores").innerHTML = "&nbsp;";
};

// Event listeners
document.getElementById("start").addEventListener("click", startGame);
