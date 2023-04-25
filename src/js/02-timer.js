import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  input: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    chooseDate();
  },
};
const fp = flatpickr(elements.input, options);

elements.btnStart.setAttribute('disabled', true);

elements.btnStart.addEventListener('click', onClick);

function chooseDate() {
  if (fp.selectedDates[0] < options.defaultDate) {
    Notify.failure('Please choose a date in the future');
  } else {
    elements.btnStart.removeAttribute('disabled');
  }
}

function onClick() {
  timerId = setInterval(() => {
    let timeDifference = fp.selectedDates[0] - Date.now();
    if (timeDifference <= 1000) {
      clearInterval(timerId);
    }

    addLeadingZero(convertMs(timeDifference));
    elements.btnStart.setAttribute('disabled', true);
    elements.input.setAttribute('disabled', true);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  elements.days.textContent = value.days.toString().padStart(2, '0');
  elements.hours.textContent = value.hours.toString().padStart(2, '0');
  elements.minutes.textContent = value.minutes.toString().padStart(2, '0');
  elements.seconds.textContent = value.seconds.toString().padStart(2, '0');
}
