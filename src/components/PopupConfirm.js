import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  // callback принимает в конструктор колбэк сабмита формы.
  _callbackSubmit = null;
  //  Привязываем метод _submit, к текущему контексту
  _submit = this._submit.bind(this);

  _submitButtonText = null;

  _dataConfirm = {};

  constructor(popupElement, callbackSubmit) {
    super(popupElement);
    this._submitButtonText = popupElement.querySelector(
      ".form-edit__save-button"
    );
    this._callbackSubmit = callbackSubmit;
  }

  // Вызов колбэк-функции с аргументами в виде полученой карточки, методом this._getInputValues()
  _submit(evt) {
    evt.preventDefault();
    this._submitButtonText.textContent = "Удаление...";
    this._callbackSubmit();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._submit);
  }

  open(dataConfirm) {
    this._dataConfirm = dataConfirm;
    this._submitButtonText.textContent = "Удалить";
    super.open();
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
  }
}
