function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnEls = document.querySelector('.section_btn_switcher');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener('click', onButtonStart);
btnStop.addEventListener('click', onButtonStop);

function onButtonStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.toggleAttribute('disabled');
  btnStop.removeAttribute('disabled');
}

function onButtonStop() {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.removeAttribute('disabled');
}
