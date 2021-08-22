import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Этот класс должен перезаписывать родительский метод open.
  // В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(data) {
    this._popupSelector.querySelector(".popup__picture").src = data.link;
    this._popupSelector.querySelector(".popup__picture").alt = data.name;
    this._popupSelector.querySelector(".popup__picture-text").textContent =
      data.name;
    super.open();
  }
}
