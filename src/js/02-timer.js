import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const ColorLikeCalendar = '#1bbc9b';

btnStartEl.setAttribute('disabled', '');

btnStartEl.addEventListener('click', onStart);

let inputDate;

function onStart() {
  options.clickOpens = false;
  flatpickr(inputEl, options);
  btnStartEl.setAttribute('disabled', '');
  timerEl.style.color = ColorLikeCalendar;

  const timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = inputDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    secondsEl.textContent = seconds;
    minutesEl.textContent = minutes;
    hoursEl.textContent = hours;
    daysEl.textContent = days;

    if (
      Number(seconds) <= 0 &&
      Number(minutes) <= 0 &&
      Number(hours) <= 0 &&
      Number(days) <= 0
    ) {
      clearInterval(timerId);
      timerEl.style.color = 'red';
      btnStartEl.style.backgroundColor = '#fff';
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 100) {
    return value.toString().padStart(2, '0');
  } else {
    return String(value).padStart(3, '0');
  }
}

// flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputDate = selectedDates[0];
    const currentDate = options.defaultDate;
    const result = inputDate - currentDate;

    if (result <= 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      btnStartEl.removeAttribute('disabled');
      btnStartEl.style.backgroundColor = ColorLikeCalendar;
    }
  },
};

flatpickr(inputEl, options);

// Notiflix styles

Notiflix.Notify.init({
  cssAnimationStyle: 'from-right',
  position: 'center-top',
});

// add styles

const markupStyle = ` <style>
      .timer {
        display: flex;
        gap: 20px;
        margin-top: 20px;           
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 1px;
        align-items: center;
        font-weight: bold;
        font-size: 10px;
        text-transform: uppercase;      
      }

      .value {
        font-size: 30px;        
      }
    </style>`;

timerEl.insertAdjacentHTML('beforeend', markupStyle);
