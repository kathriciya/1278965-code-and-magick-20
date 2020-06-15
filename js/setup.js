'use strict';

var Magic = {
  COUNT: 4,
  OUT: 27,
  INTO: 13,
  MIN: 2,
  MAX: 25
};

var wizards = [];

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyes = ['black', 'red', 'blue', 'yellow', 'green'];

var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var addWizards = function () {
  for (var i = 0; i < Magic.COUNT; i++) {
    wizards.push(
        {
          name: firstNames[getRandomInt(0, firstNames.length - 1)] + ' ' + lastNames[getRandomInt(0, lastNames.length - 1)],
          coatColor: coats[getRandomInt(0, coats.length - 1)],
          eyesColor: eyes[getRandomInt(0, eyes.length - 1)]
        }
    );
  }
};
addWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {

    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};
renderWizards();

// Домашка

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === Magic.OUT && !evt.target.classList.contains('setup-user-name')) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === Magic.INTO) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === Magic.INTO) {
    closePopup();
  }
});

// Валидация

var userNameInput = document.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < Magic.MIN) {
    userNameInput.setCustomValidity('Ещё ' + (Magic.MIN - valueLength) + ' симв.');
  } else if (valueLength > Magic.MAX) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - Magic.MAX) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var coatInput = document.querySelector('input[name="coat-color"]');
var eyesInput = document.querySelector('input[name="eyes-color"]');
var fireballInput = document.querySelector('input[name="fireball-color"]');
var coat = setup.querySelector('.wizard-coat');
var eye = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

coat.addEventListener('click', function () {
  var randomCoatColor = coats[getRandomInt(0, coats.length - 1)];
  coat.style.fill = randomCoatColor;
  coatInput.value = randomCoatColor;
});

eye.addEventListener('click', function () {
  var randomEyeColor = eyes[getRandomInt(0, eyes.length - 1)];
  eye.style.fill = randomEyeColor;
  eyesInput.value = randomEyeColor;
});

fireball.addEventListener('click', function () {
  var randomFireballColor = fireballs[getRandomInt(0, fireballs.length - 1)];
  fireball.style.background = randomFireballColor;
  fireballInput.value = randomFireballColor;
});
