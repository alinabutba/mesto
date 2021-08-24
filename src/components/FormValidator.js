export class FormValidator {

  // Форма, которая валидируется
  _formElement = null;

  // Настройки валидации (селекторы формы)
  _formSelector = null;
  _inputSelector = null;
  _submitButtonSelector = null;
  _inactiveButtonClass = null;
  _errorClass = null;
  _errorTypeInvalid = null;
  _errorTypeValid = null;

  // Элемент кнопки из формы
  _buttonElement = null;

  // Массив инпутов
  _inputList = null;

  // Bind  
  resetValidation = this.resetValidation.bind(this);

  constructor(formElement, validationSetting) {
    this._formElement = formElement;

    this._formSelector = validationSetting.formSelector;
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._errorClass = validationSetting.errorClass;
    this._errorTypeInvalid = validationSetting.errorTypeInvalid;
    this._errorTypeValid = validationSetting.errorTypeValid;

    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    // Создаем массив инпутов, с помощью [...]
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
  }

  // Получим елемент ошибки
  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  // Отображает класс с ошибкой, на вход сама форма, поле ввода, которое валидируется, и текст сообщения ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._errorTypeInvalid);
    inputElement.classList.remove(this._errorTypeValid);
  }

  // Скрывает класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._errorTypeInvalid);
    inputElement.classList.add(this._errorTypeValid);
  }

  // Состояние кнопки, если не валидно, то отключаем кнопку
  setStateButton(valid) {
    if (!valid) {
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.removeAttribute("disabled", true);
    }
  }

  // Проверка валидации всех полей
  _isValidAllInput() {
    return this._inputList.every((field) => {
      return field.validity.valid;
    });
  }

  // Валидация элемента формы, на вход задаем форму и валидируемый элемент (поле)
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Слушатели
  _setListeners() {
    this._inputList.forEach((field) => {
      field.addEventListener("input", () => {
        this._checkInputValidity(field);
        // Использую тернарный оператор условия в место if else
        this._isValidAllInput()
          ? this.setStateButton(true)
          : this.setStateButton(false);
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((field) => {
      const errorElement = this._getErrorElement(field);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
      field.classList.remove(this._errorTypeInvalid);
      field.classList.remove(this._errorTypeValid);
    });
  }

  // Запуск валидации
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Выключаем кнопку после отправки
      this.setStateButton(false);
      // this.resetValidation();
    });

    this._setListeners();
  }
}
