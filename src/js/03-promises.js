import Notiflix from 'notiflix';

Notiflix.Notify.init({
  useIcon: false,
  fontSize: '15px',
});

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onCreateAmountPromises);

function onCreateAmountPromises(evt) {
  evt.preventDefault();
  let position = Number(amountEl.value);
  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);

  for (let index = 1; index <= position; index++) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

// ===================================================

// const btnSubmitEl = document.querySelector('button');

// let position = 5;
// let delay = 3000;
// let step = 500;

// for (let index = 1; index <= position; index++) {
//   createPromise(index, delay)
//     .then(({ position, delay }) => {
//       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     })
//     .catch(({ position, delay }) => {
//       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//     });

//   delay += step;
// }

// btnSubmitEl.addEventListener('submit', createPromise);

// formEl.addEventListener('input', onValue);

// formEl.addEventListener('click', onValue);

// function onColor() {
//   // evt.preventDefault();
//   document.body.style.backgroundColor = 'teal';
//   console.log('onColor');

//   // console.log(evt.target.value);
// }

// function onValue(evt) {
//   evt.preventDefault();
//   console.log(Number(delayEl.value));
//   console.log(stepEl.value);
//   console.log(amountEl.value);

//   onColor();
//   // console.log('Hello');
// }

// // formEl.addEventListener('submit', onValue);

// ====================================================
