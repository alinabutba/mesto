export default class Popup {
  _selectorOpenedPopup = "popup_opened"; // CSS класс для отображения попапа
  _selectorPopupCloseButton = ".popup__close-button"; // CSS класс кнопки

  _closePopupButton = null;

  _popupElement = null; // Сам попап, к которому добавляем модификатор popup_opened

  _handleEscClose = this._handleEscClose.bind(this); // забиндим метод к текущему классу this
  _handleOverlayClose = this._handleOverlayClose.bind(this); // забиндим метод к текущему классу this
  setEventListeners = this.setEventListeners.bind(this); // забиндим метод к текущему классу this

  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closePopupButton = this._popupElement.querySelector(
      this._selectorPopupCloseButton
    );
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add(this._selectorOpenedPopup);
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }

  close() {
    this._popupElement.classList.remove(this._selectorOpenedPopup);
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClose);
  }

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа
  // Модальное окно закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    this._closePopupButton.addEventListener("click", () => {
      this.close();
    });
  }
}
