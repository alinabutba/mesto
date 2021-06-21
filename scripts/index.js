const initialCards = [
  {
    name: "Дом",
    link: "https://images.unsplash.com/photo-1551250943-c58324bd07a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1952&q=80",
  },
  {
    name: "Рынок",
    link: "https://images.unsplash.com/photo-1598357850400-d6d5c0c8091a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    name: "Париж",
    link: "https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    name: "Книжный магазин",
    link: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=841&q=80",
  },
  {
    name: "Номер",
    link: "https://images.unsplash.com/photo-1471623600634-4d04cfc56a27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Кафе",
    link: "https://images.unsplash.com/photo-1614054033900-9ec490acda18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
];

const overlay = document.querySelector(".overlay");
const popupEdit = document.querySelector(".popup-edit");
const popupCard = document.querySelector(".popup-card");

const popupImage = document.querySelector(".popup-image");
const closeButtonPopupImage = document.querySelector(
  ".popup-image__close-button"
);

const openButtonPopupEdit = document.querySelector(".person-card__edit-button");
const closeButtonPopupEdit = document.querySelector(
  ".popup-edit__close-button"
);
const openButtonPopupCard = document.querySelector(".add-button");
const closeButtonPopupCard = document.querySelector(
  ".popup-card__close-button"
);

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

// слушатели для форм
submitCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(cardTitle.value, cardLink.value);
  popupCard.classList.remove("popup-card_opened");
  overlay.classList.remove("overlay_opened");
});

submitPersonForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardName.textContent = nameInput.value;
  cardJob.textContent = jobInput.value;
  popupEdit.classList.remove("popup-edit_opened");
  overlay.classList.remove("overlay_opened");
});

// добавление карточек
for (let i = 0; i < initialCards.length; i += 1) {
  const currentItem = initialCards[i];
  addCard(currentItem.name, currentItem.link);
}

// отрисовка одной карточки
function addCard(name, link) {
  const newCard = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const cardTitle = newCard.querySelector(".element__title");
  const cardImage = newCard.querySelector(".element__image");
  const picture = document.querySelector(".popup-image__picture");
  const pictureText = document.querySelector(".popup-image__picture-text");
  const deleteButton = newCard.querySelector(".element__delete");
  const likeButton = newCard.querySelector(".element__like");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardsContainerTemplate.prepend(newCard);

  // открытие popup с картинкой
  cardImage.addEventListener("click", () => {
    overlay.classList.add("overlay_opened");
    picture.src = link;
    pictureText.textContent = name;
    popupImage.classList.add("popup-image_opened");
  });

  // удаление карточки
  deleteButton.addEventListener("click", () => {
    newCard.remove();
  });

  // лайк
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element_active-like");
    console.log(newCard);
  });
}

// открытие и закрытие формы профиля
openButtonPopupEdit.addEventListener("click", (evt) => {
  evt.preventDefault();
  overlay.classList.add("overlay_opened");
  nameInput.value = cardName.textContent;
  jobInput.value = cardJob.textContent;
  popupEdit.classList.add("popup-edit_opened");
});

closeButtonPopupEdit.addEventListener("click", () => {
  popupEdit.classList.remove("popup-edit_opened");
  overlay.classList.remove("overlay_opened");
});

// открытие и закрытие формы добавления карточек
openButtonPopupCard.addEventListener("click", () => {
  overlay.classList.add("overlay_opened");
  cardTitle.value = "Название";
  cardLink.value = "Ссылка на картинку";
  popupCard.classList.add("popup-card_opened");
});

closeButtonPopupCard.addEventListener("click", () => {
  popupCard.classList.remove("popup-card_opened");
  overlay.classList.remove("overlay_opened");
});

// закрытие popup с картинкой
closeButtonPopupImage.addEventListener("click", () => {
  popupImage.classList.remove("popup-image_opened");
  overlay.classList.remove("overlay_opened");
});
