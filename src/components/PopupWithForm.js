import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // callback принимает в конструктор колбэк сабмита формы.
  _callbackSubmit = null;
  // callback сброс форы
  _callbackValidity = null;
  // Тут будут храниться инпут листы из
  _inputListField = [];
  // Хранит массив полей form-edit__field
  _inputsData = {};

  //  Привязываем метод _submit, к текущему контексту
  _submit = this._submit.bind(this);
  _getInputValues = this._getInputValues.bind(this);

  _submitButtonText = null;

  constructor(popupElement, callbackValidity, callbackSubmit) {
    super(popupElement);
    this._submitButtonText = popupElement.querySelector(
      ".form-edit__save-button"
    );
    this._callbackValidity = callbackValidity;
    this._callbackSubmit = callbackSubmit;
    this._inputListField = [
      ...this._popupElement.querySelectorAll(".form-edit__field"),
    ];
  }

  // Получаем все инпуты в попапе и возвращаем в виде объекта
  _getInputValues() {
    this._inputListField.forEach((field) => {
      this._inputsData[field.name] = field.value;
    });
    return this._inputsData;
  }

  // Собирает данные всех полей формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._submit);
  }

  // Вызов колбэк-функции с аргументами в виде полученой карточки, методом this._getInputValues()
  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this._submitButtonText.textContent = "Сохранение...";
    // this.close();
  }

  open() {
    this._submitButtonText.textContent = "Сохранить";
    super.open();
    this._callbackValidity.resetValidation();
    this._callbackValidity.setStateButton(false);
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    this._popupElement.querySelector(".form-edit").reset();
    super.close();
  }
}
