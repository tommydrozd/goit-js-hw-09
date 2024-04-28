import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";


const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


startBtn.setAttribute('disabled', true);
let chosenDate = null;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        Notify.failure("Please choose a date in the future")
        startBtn.setAttribute('disabled', true);
        dateInput.style.borderColor = "red";
    } else {
        chosenDate = selectedDates[0];

        startBtn.removeAttribute('disabled');
        startBtn.addEventListener('click', timerOn);
        dateInput.style.borderColor = "#569ff7";
    }
  },
};


flatpickr('#datetime-picker', options);

function timerOn(){
    timerId = setInterval(() => {
        startBtn.setAttribute('disabled', true);
        dateInput.setAttribute('disabled', true);

        const currentTime = Date.now();
        const deltaTime = chosenDate - currentTime;

        if (deltaTime < 1000) {
            clearInterval(timerId);
            startBtn.removeAttribute('disabled');
        }
 
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updClockInterface({ days, hours, minutes, seconds });
        
    }, 1000)
}


function updClockInterface({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}