const startBtn = document.getElementById("start");
const screens = document.querySelectorAll(".screen");
const timeList = document.getElementById("time-list");
const timeEl = document.getElementById("time");
const board = document.getElementById("board");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = Number(event.target.dataset.time);

    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Your score is <span class="primary">${score}</span></h1>`;
  setTimeout(() => {
    location.reload();
  }, 3000);
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const radius = getRandomNumber(5, 15);
  const color = `rgb(${getRandomNumber(30, 220)}, ${getRandomNumber(
    30,
    220
  )}, ${getRandomNumber(30, 220)})`;
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(15, width - radius - 10);
  const y = getRandomNumber(15, height - radius - 10);
  circle.style.background = color;
  circle.style.width = `${radius}px`;
  circle.style.height = `${radius}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
