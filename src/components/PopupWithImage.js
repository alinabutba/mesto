import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  _popupElementImage = null;
  _popupElementImageText = null;

  constructor(popupElement) {
    super(popupElement);

    this._popupElementImage = popupElement.querySelector(".popup__picture");
    this._popupElementImageText = popupElement.querySelector(
      ".popup__picture-text"
    );
  }

  // Этот класс должен перезаписывать родительский метод open.
  // В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(data) {
    this._popupElementImage.src = data.link;
    this._popupElementImage.alt = data.name;
    this._popupElementImageText.textContent = data.name;
    super.open();
  }
}
