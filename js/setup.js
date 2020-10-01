// eslint-disable-next-line strict
'use strict';

const FIRST_NAME = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const SECOND_NAME = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLOR = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLOR = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const WIZARDS_QUANTITY = 4;

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);


const getRandomArrayIndex = function (arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const getWizardArray = (wizardsQuantity) => {
  let wizardsArray = [];

  for (let i = 0; i < wizardsQuantity; i++) {
    wizardsArray.push({
      name: `${getRandomArrayIndex(FIRST_NAME)} ${getRandomArrayIndex(SECOND_NAME)}`,
      coatColor: getRandomArrayIndex(COAT_COLOR),
      eyesColor: getRandomArrayIndex(EYES_COLOR)
    });
  }

  return wizardsArray;
};

const renderWizard = (wizard) => {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let renderWizards = (wizards) => {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

renderWizards(getWizardArray(WIZARDS_QUANTITY));

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
