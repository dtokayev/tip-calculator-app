const billInputField = document.getElementById('bill');
const totalBillText = document.getElementById('bill-total');
const perPersonBillText = document.getElementById('bill-per-person');

const numPeopleField = document.getElementById('num-people');

const tipButtons = document.querySelectorAll('input[type="radio"]');
const customTipRadio = document.getElementById('custom');
const customTipField = document.getElementById('custom-tip-field');

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
  const billPerPerson = billAfterTip / numPeople;

  totalBillText.textContent = '$' + tipAmount.toFixed(2);
  perPersonBillText.textContent = '$' + billPerPerson.toFixed(2);
}

billInputField.addEventListener('input', computeAmount);
numPeopleField.addEventListener('input', computeAmount);
tipButtons.forEach(btn => {
  btn.addEventListener('change', computeAmount);
});

customTipField.addEventListener('focus', e => {
  customTipRadio.checked = true;
  computeAmount();
});

customTipField.addEventListener('input', computeAmount);
