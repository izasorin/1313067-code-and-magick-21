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

const WIZARDS_QUANTITY = 4;

const userDialog = document.querySelector(`.setup`);
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

const getRandom = (min, max) => Math.floor(min + Math.random() * (max - min));

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

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

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
userDialog.classList.remove(`hidden`);
