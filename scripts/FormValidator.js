export class FormValidator {
  // Форма, которая валидируется
  _formElement = null;

  // Настройки валидации (селекторы формы)
  _formSelector = null;
  _inputSelector = null;
  _submitButtonSelector = null;
  _inactiveButtonClass = null;
  _errorClass = null;

  // Элемент кнопки из формы
  _buttonElement = null;

  // Массив инпутов
  _inputList = null;

  constructor(formElement, validationSetting) {
    this._formElement = formElement;

    this._formSelector = validationSetting.formSelector;
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._errorClass = validationSetting.errorClass;

    this._buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
  }

  // Отображает класс с ошибкой, на вход сама форма, поле ввода, которое валидируется, и текст сообщения ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрывает класс с ошибкой
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  // Состояние кнопки, если не валидно, то отключаем кнопку
  _setStateButton(valid) {
    if (!valid) {
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.removeAttribute("disabled", true);
    }
  }

  // Проверка валидации всех полей
  _isValidAllInput() {
    // Проходим по массиву и проверяем, что каждый элемент при вызове валидации возвращает true
    const isValidAll = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    if (isValidAll) {
      this._setStateButton(true);
    } else {
      this._setStateButton(false);
    }
  }

  // Валидация элемента формы, на вход задаем форму и валидируемый элемент (поле)
  _checkInputValidity(formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(formElement, inputElement, errorMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  // Запуск валидации
  enableValidation() {
    // Изначально кнопка submit не активна
    this._setStateButton(false);

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Выключаем кнопку после отправки
      this._setStateButton(false);
    });
    // В цикле на каждое поле вешаем валидацию
    this._inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(this._formElement, input);

        // Проверяем валидацию всех полей, чтобы отключить или включить кнопку
        this._isValidAllInput();
      });
    });
  }
}
