const startBtnEl = document.querySelector('button[data-start');
const stopBtnEl = document.querySelector('button[data-stop');

stopBtnEl.setAttribute('disabled', '');
let timerId = null;

startBtnEl.addEventListener('click', onStart);
stopBtnEl.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtnEl.setAttribute('disabled', '');
  stopBtnEl.removeAttribute('disabled');
}

function onStop() {
  clearInterval(timerId);
  startBtnEl.removeAttribute('disabled');
  stopBtnEl.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
