import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // callback принимает в конструктор колбэк сабмита формы.
  _callbackSubmit = null;
  // Тут будут храниться инпут листы из
  _inputListField = null;
  // Хранит массив полей form-edit__field
  _inputsData = {};
  //  Привязываем метод _submit, к текущему контексту
  _submit = this._submit.bind(this);

  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }

  // Получаем все инпуты в попапе и возвращаем в виде массива
  _getInputValues() {
    this._inputListField = Array.from(
      this._popupSelector.querySelectorAll(".form-edit__field")
    );
    this._inputListField.forEach((field) => {
      this._inputsData[field.name] = field.value;
    });

    return this._inputsData;
  }

  // Собирает данные всех полей формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", this._submit);
  }

  // Получаем доступ к полям, создадим массив
  _getFieldText() {
    this._inputListField = Array.from(
      this._popupSelector.querySelectorAll(".form-edit__field")
    );

    return this._inputListField;
  }

  // Записать данные в поля
  setFieldText({ name, job }) {
    const fields = this._getFieldText();
    fields[0].value = name;
    fields[1].value = job;
  }

  // Вызов колбэк-функции с аргументами в виде полученой карточки, методом this._getInputValues()
  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this._popupSelector.querySelector(".form-edit").reset();
    this.close();
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    this._popupSelector.removeEventListener("submit", this._submit);
    super.close();
  }
}
