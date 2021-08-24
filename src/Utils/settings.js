// Настройка валидации
export const validationSetting = {
  formSelector: ".form-edit",
  inputSelector: ".form-edit__field",
  submitButtonSelector: ".form-edit__save-button",
  inactiveButtonClass: "form-edit__save-button_inactive",
  errorClass: "form-edit__field-error_active",
  errorTypeInvalid: "form-edit__field_type_error",
  errorTypeValid: "form-edit__field_type_valid"
};

// Общие селекторы попапов
export const popupData = {
  closeButtonPopupEdit: document.querySelector(".popup__close-button"),
  formEditAll: document.querySelectorAll(".form-edit"),
};

// Попап редактирования профиля
export const popupEditData = {
  popupEdit: document.querySelector("#popup-edit"),
  openButtonPopupEdit: document.querySelector(".person-card__edit-button"),
  buttonAddPopupEdit: document.querySelector(".add-button"),
  submitPersonForm: document.querySelector("#person-form"),
  nameInput: document.querySelector("#name-form"),
  jobInput: document.querySelector("#job-form"),
};

// Селекторы, отображающие имя и профессию
export const userInfoData = {
  cardName: document.querySelector(".person-card__name"),
  cardJob: document.querySelector(".person-card__job"),
};

// Попап добавления карточки
export const popupCardData = {
  popupCard: document.querySelector("#popup-card"),
  submitCardForm: document.querySelector("#card-form"),
  cardTitle: document.querySelector("#title-form"),
  cardLink: document.querySelector("#link-form"),
  cardsContainerTemplate: document.querySelector(".elements"),
  cardTemplate: document.querySelector("#element-template"),
};

// Попап с картинкой
export const popupImageData = {
  popupImage: document.querySelector("#popup-image"),
};
