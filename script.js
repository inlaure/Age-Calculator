'use strict';

const dayInput = document.querySelector('.day');
const monthInput = document.querySelector('.month');
const yearInput = document.querySelector('.year');
const form = document.querySelector('.input-container');
const inputData = document.querySelectorAll('input');
const dayError = document.querySelector('.day-error');
const monthError = document.querySelector('.month-error');
const yearError = document.querySelector('.year-error');
const errors = document.querySelectorAll('.error');
const resultContainer = document.querySelector('.result-container');
const ageContainer = document.querySelector('.age-container');
const container = document.querySelector('.container');
const btn = document.querySelector('.btn');

//Current date
const today = new Date();
let curYear = today.getFullYear();
let curMonth = 1 + today.getMonth();
let curDay = today.getDate();
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function setError(input, msg) {
  const parent = input.parentElement;
  parent.querySelector('label').style.color = 'var(--red)';
  parent.querySelector('.error').textContent = msg;
}

function setSuccess(input) {
  const parent = input.parentElement;
  parent.querySelector('label').style.color = 'var(--lightGrey)';
  parent.querySelector('.error').textContent = '';
}

function dataValidation() {
  let valid = true;
  if (!dayInput.value || !monthInput.value || !yearInput.value) {
    inputData.forEach(i => {
      if (!i.value) {
        setError(i, 'Enter a value');
      }
    });
    valid = false;
  } else if (+yearInput.value > curYear) {
    setError(yearInput, 'Incorrect value!');
    valid = false;
  } else if (+yearInput.value === curYear && +monthInput.value > curMonth) {
    setError(monthInput, 'Incorrect value');
    valid = false;
  } else if (
    +dayInput.value > curDay &&
    +monthInput.value === curMonth &&
    +yearInput.value === curYear
  ) {
    setError(dayInput, 'Incorrect value');
    valid = false;
  } else if (
    +monthInput.value === 4 ||
    +monthInput.value === 6 ||
    +monthInput.value === 9 ||
    +monthInput.value === 11
  ) {
    if (+dayInput.value > 30) {
      setError(dayInput, 'Incorrect value!');
      valid = false;
    } else {
      setSuccess(dayInput);
      valid = true;
    }
  } else if (+monthInput.value === 2 && +dayInput.value > 28) {
    if (+yearInput.value % 4 !== 0) {
      setError(dayInput, 'Incorrect value');
      valid = false;
    } else if (+yearInput.value % 4 === 0 && +dayInput.value > 29) {
      setError(dayInput, 'Incorrect value');
      valid = false;
    } else {
      setSuccess(dayInput);
      setSuccess(monthInput);
      setSuccess(yearInput);
      valid = true;
    }
  } else if (+dayInput.value > 31 || +dayInput.value < 1) {
    setError(dayInput, 'Incorrect value!');
    valid = false;
  } else if (+monthInput.value > 12 || +monthInput.value < 1) {
    setError(monthInput, 'Incorrect value!');
    valid = false;
  } else {
    errors.forEach(err => (err.textContent = ''));
    inputData.forEach(
      i =>
        (i.parentElement.querySelector('label').style.color =
          'var(--lightGrey)')
    );
    valid = true;
  }
  return valid;
}

btn.addEventListener('click', function (e) {
  let dayOutput, monthOutput, yearOutput;
  resultContainer.innerHTML = '';
  if (dataValidation()) {
    if (dayInput.value > curDay) {
      curDay += months[curMonth - 1];
      --curMonth;
    }
    if (monthInput.value > curMonth) {
      curMonth += 12;
      --curYear;
    }

    dayOutput = curDay - dayInput.value;
    monthOutput = curMonth - monthInput.value;
    yearOutput = curYear - yearInput.value;
    const markup = `<div class=age-container><div class="age-year"><span>${yearOutput}</span> years</div>
    <div class="age-month"><span>${monthOutput}</span> months</div>
    <div class="age-day"><span>${dayOutput}</span> days</div></div>`;
    resultContainer.insertAdjacentHTML('afterbegin', markup);
  }
  if (!dataValidation()) {
    resultContainer.innerHTML = `<div class="age-year"><span>--</span> years</div>
  <div class="age-month"><span>--</span> months</div>
  <div class="age-day"><span>--</span> days</div>`;
  }
});
