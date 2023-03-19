import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  cssAnimationStyle: 'from-right',
  position: 'center-top',
});

const inputEl = document.querySelector('#datetime-picker');
const timerEl = document.querySelector('.timer');
const btnStartEl = document.querySelector('button');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.setAttribute('disabled', 'true');

btnStartEl.addEventListener('click', onStart);

let inputDate;

function onStart() {
  timerEl.style.color = 'teal';

  timerId = setInterval(() => {
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
      timerEl.style.color = 'red';
      clearInterval(timerId);
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
      Notiflix.Notify.failure('Please choose a date in the future');
      //   alert('Please choose a date in the future');
      btnStartEl.setAttribute('disabled', '');
    } else {
      btnStartEl.removeAttribute('disabled');
    }
  },
};

flatpickr(inputEl, options);

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
