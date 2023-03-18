import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const messageEl = document.querySelector('textarea');
const emailEl = document.querySelector('input');

const LOCALSTORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

getLastFormData();

let formData = {};

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({
      ...formData,
      email: emailEl.value,
      message: messageEl.value,
    })
  );
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const formDataJs = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (formDataJs.email !== '' && formDataJs.message !== '') {
    console.log(formDataJs);
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    alert('Остались незаполненные поля!');
  }
}

function getLastFormData() {
  const lastFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (lastFormData) {
    emailEl.value = JSON.parse(lastFormData).email || '';
    messageEl.value = JSON.parse(lastFormData).message || '';
  }
}
