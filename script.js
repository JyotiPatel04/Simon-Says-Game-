let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.getElementById("start-btn");

// start when key pressed or button clicked
document.addEventListener("keydown", startGame);
startBtn.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    console.log("Game started");
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    levelUp();
  }
}

function flashButton(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);

  // show sequence one by one
  playSequence();
}

function playSequence() {
  let i = 0;
  let interval = setInterval(() => {
    let color = gameSeq[i];
    let btn = document.getElementById(color);
    flashButton(btn);
    i++;
    if (i >= gameSeq.length) clearInterval(interval);
  }, 600);
}

// Handle user clicks
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", function () {
    if (!started) return;

    let userColor = btn.id;
    userSeq.push(userColor);
    flashButton(btn);
    checkAnswer(userSeq.length - 1);
  });
}

function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! You reached Level <b>${level}</b><br>Press any key or Start again`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "#f7f7f7";
    }, 200);
    resetGame();
  }
}

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}


