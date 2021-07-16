// функции showInputError и hideInputError добавляют и очищают текст и класс ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

// активное и неактивное состояния кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement, errorClass) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass);
  }
};

const setEventListeners = (
  formElement,
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  };
  formElement.addEventListener("submit", handleFormSubmit);

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    };

    inputElement.addEventListener("input", handleInput);
  };

  inputList.forEach(inputListIterator);
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements);

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    setEventListeners(
      formElement,
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

// функция проходится по всем формам и навешивает на них обработчики событий
enableValidation({
  formSelector: ".form-edit",
  inputSelector: ".form-edit__field",
  submitButtonSelector: ".form-edit__save-button",
  inactiveButtonClass: "form-edit__save-button_inactive",
  inputErrorClass: "form-edit__field-error",
  errorClass: "form-edit__field-error_active",
});