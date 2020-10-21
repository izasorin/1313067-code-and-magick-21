'use strict';

const FIRST_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const SECOND_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYE_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`,
];

const WIZARDS_QUANTITY = 4;

const userDialog = document.querySelector(`.setup`);
const userDialogOpen = document.querySelector(`.setup-open`);
const userDialogClose = document.querySelector(`.setup-close`);
const setupWizard = document.querySelector(`.setup-wizard`);

const setupUserName = userDialog.querySelector(`.setup-user-name`);
const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
const inputWizardCoat = userDialog.querySelector(`input[name=coat-color]`);
const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const inputWizardEyes = userDialog.querySelector(`input[name=eyes-color]`);
const setupWizardFireball = userDialog.querySelector(`.setup-fireball-wrap`);
const inputWizardFireball = userDialog.querySelector(`input[name=fireball-color]`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

const getRandom = (min, max) => Math.floor(min + Math.random() * (max - min));

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  userDialog.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  userDialog.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

//

const generateWizards = (amount) => new Array(amount).fill(``).map(() => ({
  name: `${getRandomFrom(FIRST_NAMES)} ${getRandomFrom(SECOND_NAMES)}`,
  coatColor: getRandomFrom(COAT_COLORS),
  eyesColor: getRandomFrom(EYE_COLORS)
}));

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizards = (wizards) => {
  const fragment = document.createDocumentFragment();
  wizards.map(renderWizard).forEach((wizard) => fragment.appendChild(wizard));
  return fragment;
};

const wizards = generateWizards(WIZARDS_QUANTITY);
similarListElement.appendChild(renderWizards(wizards));

// userDialog.classList.remove(`hidden`);

userDialogOpen.addEventListener(`click`, function () {
  openPopup();
});

userDialogOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupUserName.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

setupUserName.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

userDialogClose.addEventListener(`click`, function () {
  closePopup();
});

userDialogClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupWizardCoat.addEventListener(`click`, function () {
  const randomColor = getRandomFrom(COAT_COLORS);
  setupWizardCoat.style.fill = randomColor;
  inputWizardCoat.value = randomColor;
});

setupWizardEyes.addEventListener(`click`, function () {
  const randomColor = getRandomFrom(EYE_COLORS);
  setupWizardEyes.style.fill = randomColor;
  inputWizardEyes.value = randomColor;
});

setupWizardFireball.addEventListener(`click`, function () {
  const randomColor = getRandomFrom(FIREBALL_COLORS);
  setupWizardFireball.style.backgroundColor = randomColor;
  inputWizardFireball.value = randomColor;
});

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
