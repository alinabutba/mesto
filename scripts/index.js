import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Создание переменных для работы с DOM объектами
const popupEdit = document.querySelector("#popup-edit");
const popupCard = document.querySelector("#popup-card");
const popupImage = document.querySelector("#popup-image");

const openButtonPopupEdit = document.querySelector(".person-card__edit-button");
const closeButtonPopupEdit = document.querySelector(".popup__close-button");
const openButtonPopupCard = document.querySelector(".add-button");

const submitPersonForm = document.querySelector("#person-form");
const nameInput = document.querySelector("#name-form");
const jobInput = document.querySelector("#job-form");
const cardName = document.querySelector(".person-card__name");
const cardJob = document.querySelector(".person-card__job");

const submitCardForm = document.querySelector("#card-form");
const cardTitle = document.querySelector("#title-form");
const cardLink = document.querySelector("#link-form");
const cardsContainerTemplate = document.querySelector(".elements");
const cardTemplate = document.querySelector("#element-template");

const picture = popupImage.querySelector(".popup__picture");
const pictureText = popupImage.querySelector(".popup__picture-text");

const formEditAll = document.querySelectorAll(".form-edit");

// Добавление слушателя на кнопку закрытия popup
function initialClosePopupButtons(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });

  // Закрытие всех popups кликом на overlay
  popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

// Закрытие всех popups кнопкой Esc
function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEsc);
}

// Функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleEsc);
}

// Функция заполнения формы popup с картинкой
function addInfoPopupImage(link, name) {
  picture.src = link;
  picture.alt = name;
  pictureText.textContent = name;
}

// Слушатели событий на кнопки закрытия в popup и их вызовы
initialClosePopupButtons(popupEdit);
initialClosePopupButtons(popupCard);
initialClosePopupButtons(popupImage);

// Слушатели для формы карточка
submitCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = new Card(
    { name: cardTitle.value, link: cardLink.value },
    cardTemplate,
    handlerPopupCard
  );
  cardsContainerTemplate.prepend(card.renderCard());
  closePopup(popupCard);
  submitCardForm.reset();
});

// Слушатели для формы редактирования профиля
submitPersonForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardName.textContent = nameInput.value;
  cardJob.textContent = jobInput.value;
  closePopup(popupEdit);
});

// Слушатели для формы картинки (действует по нажатию на каринку карточки)
openButtonPopupEdit.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = cardName.textContent;
  jobInput.value = cardJob.textContent;
  openPopup(popupEdit);
});

// Открытие и закрытие формы добавления карточек
openButtonPopupCard.addEventListener("click", () => {
  openPopup(popupCard);

  const inputList = Array.from(popupCard.querySelectorAll(".form-edit__field"));
  const inactiveButtonClass = popupCard.querySelector(
    ".form-edit__save-button_inactive"
  );
  const buttonElement = popupCard.querySelector(".form-edit__save-button");
});

// Callback функция открытия попапа с картинкой
function handlerPopupCard(data) {
  addInfoPopupImage(data.link, data.name);
  openPopup(popupImage);
}

//  Выводим все карточки из initialCard.js
initialCards.forEach((currentCard) => {
  const card = new Card(
    { name: currentCard.name, link: currentCard.link },
    cardTemplate,
    handlerPopupCard
  );
  cardsContainerTemplate.prepend(card.renderCard());
});

// Настройка валидации
const validationSetting = {
  formSelector: ".form-edit",
  inputSelector: ".form-edit__field",
  submitButtonSelector: ".form-edit__save-button",
  inactiveButtonClass: "form-edit__save-button_inactive",
  errorClass: "form-edit__field-error_active",
};

// Проходим по всем формам и создаем на каждую объект валидации, после вызываем сам метод enableValidation()
formEditAll.forEach((formElement) => {
  const formValidation = new FormValidator(formElement, validationSetting);
  formValidation.enableValidation();
});
