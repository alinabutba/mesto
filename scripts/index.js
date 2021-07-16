// создание переменных для работы с DOM объектами
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

// добавление слушателя на кнопку закрытия popup
function initialClosePopupButtons(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", (evt) => {
    popup.classList.remove("popup_opened");
  });

  // закрытие всех popups кликом на overlay
  popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

// закрытие всех popups кнопкой Esc
function handleEsc(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

// функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEsc);
}

// функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", (evt) => {
    handleEsc(evt, popup);
  });
}

// функция заполнения формы popup с картинкой
function addInfoPopupImage(popupImage, link, name) {
  picture.src = link;
  picture.alt = name;
  pictureText.textContent = name;
}

// функция добавления карточки
function addCard(cardNode, container) {
  container.prepend(cardNode);
}

// отрисовка одной карточки
function createCard(name, link) {
  const newCard = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const cardTitle = newCard.querySelector(".element__title");
  const cardImage = newCard.querySelector(".element__image");
  const deleteButton = newCard.querySelector(".element__delete");
  const likeButton = newCard.querySelector(".element__like");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // открытие popup с картинкой
  cardImage.addEventListener("click", () => {
    addInfoPopupImage(popupImage, link, name);
    openPopup(popupImage);
  });

  // удаление карточки
  deleteButton.addEventListener("click", () => {
    newCard.remove();
  });

  // лайк
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like_active");
  });

  // возвращение объекта с карточкой
  return newCard;
}

// Создание и рендер карточек
function renderCard(name, link, cardsContainerTemplate) {
  const cardNode = createCard(name, link);
  addCard(cardNode, cardsContainerTemplate);
}

// слушатели событий на кнопки закрытия в popup и их вызовы
initialClosePopupButtons(popupEdit);
initialClosePopupButtons(popupCard);
initialClosePopupButtons(popupImage);

// слушатели для форм
submitCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard(cardTitle.value, cardLink.value, cardsContainerTemplate);
  closePopup(popupCard);
  submitCardForm.reset();
});

submitPersonForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardName.textContent = nameInput.value;
  cardJob.textContent = jobInput.value;
  closePopup(popupEdit);
});

// открытие и закрытие формы профиля
openButtonPopupEdit.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = cardName.textContent;
  jobInput.value = cardJob.textContent;
  openPopup(popupEdit);
});

// открытие и закрытие формы добавления карточек
openButtonPopupCard.addEventListener("click", () => {
  openPopup(popupCard);

  const inputList = Array.from(popupCard.querySelectorAll(".form-edit__field"));
  const inactiveButtonClass = popupCard.querySelector(".form-edit__save-button_inactive");
  const buttonElement = popupCard.querySelector(".form-edit__save-button");

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
});

// добавление карточек
initialCards.forEach((currentCard) => {
  renderCard(currentCard.name, currentCard.link, cardsContainerTemplate);
});
