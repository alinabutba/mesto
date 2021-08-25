// импорт главного файла стилей
import "../pages/index.css";

import { initialCards } from "../Utils/initial-cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationSetting,
  popupData,
  popupEditData,
  userInfoData,
  popupCardData,
  popupImageData,
} from "../Utils/settings.js";

// Функция создания карточки, возвращает новую карточку
function createCard(data) {
  return new Card(data, popupCardData.cardTemplate, (data) => {
    popupImage.open(data);
  });
}

// Создаем объект валидации
const validateFormCard = new FormValidator(
  popupCardData.popupCard,
  validationSetting
);
validateFormCard.enableValidation();
// Создаем объект валидации
const validateFormUser = new FormValidator(
  popupEditData.popupEdit,
  validationSetting
);
validateFormUser.enableValidation();

// Вставляем секцию с картинками в этом нам поможет функция Section // Отрисовать все карточки/////
const popupImage = new PopupWithImage(popupImageData.popupImage);
popupImage.setEventListeners();

const cardList = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      const card = createCard(data);

      // Вызвав метод у готового объекта с карточкой card,
      // мы получаем обратно собранный и заполненный данными узел элементов и атрибутов
      const cardElement = card.getCard();

      // Вставляем элемент в dom
      cardList.addItem(cardElement);
    },
  },
  popupCardData.cardsContainerTemplate
);

// Вызовет метод в экземпляре класса Section,
// который пройдеться по массиву элементов и передаст каждый элемент в колбэк renderer:
cardList.renderItems();

// Слушатель кнопки, добавления карточки
popupEditData.buttonAddPopupEdit.addEventListener("click", () => {
  popupAddCard.open();
});

// Добавление карточки
const popupAddCard = new PopupWithForm(
  popupCardData.popupCard,
  validateFormCard,
  (dataForm) => {
    const card = createCard(dataForm);
    cardList.addItem(card.getCard());
  }
);
popupAddCard.setEventListeners();

// Редактирование профиля
const userInfo = new UserInfo({
  name: userInfoData.cardName,
  job: userInfoData.cardJob,
});

const popupProfile = new PopupWithForm(
  popupEditData.popupEdit,
  validateFormUser,
  (dataForm) => {
    userInfo.setUserInfo(dataForm);
  }
);
popupProfile.setEventListeners();

// Слушатель редактирования профиля
popupEditData.openButtonPopupEdit.addEventListener("click", () => {
  validateFormUser.resetValidation();
  popupProfile.setFieldText(userInfo.getUserInfo());
  popupProfile.open();
});
