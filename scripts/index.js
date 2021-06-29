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

// слушатели событий на кнопки закрытия в popup и их вызов
initialClosePopupButtons(popupEdit);
initialClosePopupButtons(popupCard);
initialClosePopupButtons(popupImage);

// добавление слушателя на кнопку закрытия popup
function initialClosePopupButtons(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", (evt) => {
    closePopup(popup);
  });
}

// функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// функция заполнения формы popup с картинкой
function addInfoPopupImage(popupImage, link, name) {
  picture.src = link;
  picture.alt = name;
  pictureText.textContent = name;
}

// слушатели для форм
submitCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardNode = createCard(cardTitle.value, cardLink.value);
  addCard(cardNode, cardsContainerTemplate);
  closePopup(popupCard);
  submitCardForm.reset();
});

submitPersonForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardName.textContent = nameInput.value;
  cardJob.textContent = jobInput.value;
  closePopup(popupEdit);
});

// добавление карточек
for (let i = 0; i < initialCards.length; i += 1) {
  const currentItem = initialCards[i];
  const cardNode = createCard(currentItem.name, currentItem.link);
  addCard(cardNode, cardsContainerTemplate);
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

// открытие и закрытие формы профиля
openButtonPopupEdit.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = cardName.textContent;
  jobInput.value = cardJob.textContent;
  openPopup(popupEdit);
});

closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

// открытие и закрытие формы добавления карточек
openButtonPopupCard.addEventListener("click", () => {
  openPopup(popupCard);
});
