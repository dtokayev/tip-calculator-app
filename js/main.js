const billInputField = document.getElementById('bill');
const billErrorText = document.getElementById('bill-error');
const totalBillText = document.getElementById('bill-total');
const perPersonBillText = document.getElementById('bill-per-person');

const numPeopleField = document.getElementById('num-people');
const peopleErrorText = document.getElementById('num-people-error');

const tipButtons = document.querySelectorAll('input[type="radio"]');
const customTipRadio = document.getElementById('custom');
const customTipField = document.getElementById('custom-tip-field');
const tipErrorText = document.getElementById('tip-error');

const resetButton = document.querySelector('.reset-button');

const firstTip = document.querySelector('input[type="radio"]');

function computeAmount() {
  const billBeforeTip = Number(billInputField.value);
  const selectedTipField = document.querySelector('input[type="radio"]:checked');
  let selectedTip;
  if (selectedTipField.value === 'custom') {
    selectedTip = Number(customTipField.value);
  } else {
    selectedTip = Number(selectedTipField.value);
  }
  const tipAmount = billBeforeTip * selectedTip / 100;
  const billAfterTip = tipAmount + billBeforeTip;

  let numPeople = Math.floor(Number(numPeopleField.value));
  if (numPeople < 1) {
    numPeople = 1;
  }
  const tipPerPerson = tipAmount / numPeople;
  const billPerPerson = billAfterTip / numPeople;

  if (tipPerPerson < 0 || billPerPerson < 0) {
    return;
  }

  totalBillText.textContent = '$' + tipPerPerson.toFixed(2);
  perPersonBillText.textContent = '$' + billPerPerson.toFixed(2);
}

function reset() {
  billInputField.value = '';
  billErrorText.textContent = '';
  billInputField.classList.remove('error-field');

  customTipField.value = '';
  tipErrorText.textContent = '';
  customTipField.classList.remove('error-field');

  numPeopleField.value = '';
  peopleErrorText.textContent = '';
  numPeopleField.classList.remove('error-field');

  firstTip.checked = true;

  computeAmount();
}

billInputField.addEventListener('input', (e) => {
  if (e.target.value === '') {
    billErrorText.textContent = 'Invalid input';
    billInputField.classList.add('error-field');
  } else if (Number(e.target.value) < 0) {
    billErrorText.textContent = 'Invalid input';
    billInputField.classList.add('error-field');
  } else {
    billErrorText.textContent = '';
    billInputField.classList.remove('error-field');
    computeAmount();
  }
});

customTipField.addEventListener('input', e => {
  if (e.target.value === '') {
    tipErrorText.textContent = 'Invalid input';
    customTipField.classList.add('error-field');
  } else if (Number(e.target.value) < 0) {
    tipErrorText.textContent = 'Invalid input';
    customTipField.classList.add('error-field');
  } else {
    tipErrorText.textContent = '';
    customTipField.classList.remove('error-field');
    computeAmount();
  }
});

customTipField.addEventListener('focus', e => {
  customTipRadio.checked = true;
  if (customTipField.value === '') {
    tipErrorText.textContent = 'Invalid input';
    customTipField.classList.add('error-field');
  } else {
    tipErrorText.textContent = '';
    customTipField.classList.remove('error-field');
    computeAmount();
  }
});

tipButtons.forEach(btn => {
  btn.addEventListener('change', e => {
    tipErrorText.textContent = '';
    customTipField.classList.remove('error-field');
    computeAmount();
  });
});

numPeopleField.addEventListener('input', e => {
  if (e.target.value === '') {
    peopleErrorText.textContent = 'Invalid input';
    numPeopleField.classList.add('error-field');
  } else if (Number(e.target.value) < 1) {
    peopleErrorText.textContent = 'Invalid input';
    numPeopleField.classList.add('error-field');
  } else {
    peopleErrorText.textContent = '';
    numPeopleField.classList.remove('error-field');
    computeAmount();
  }
});

resetButton.addEventListener('click', reset);

reset();
