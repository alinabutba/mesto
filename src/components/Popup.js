export default class Popup {
  _selectorOpenedPopup = "popup_opened"; // CSS класс для отображения попапа
  _selectorPopupCloseButton = ".popup__close-button"; // CSS класс кнопки

  _closePopupButton = null;

  _popupSelector = null; // Сам попап, к которому добавляем модификатор popup_opened

  _handleEscClose = this._handleEscClose.bind(this); // забиндим метод к текущему классу this
  _handleOverlayClose = this._handleOverlayClose.bind(this); // забиндим метод к текущему классу this
  setEventListeners = this.setEventListeners.bind(this); // забиндим метод к текущему классу this

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closePopupButton = this._popupSelector.querySelector(
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
    this._popupSelector.classList.add(this._selectorOpenedPopup);
    document.addEventListener("keyup", this._handleEscClose);
    this._popupSelector.addEventListener("click", this._handleOverlayClose);
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove(this._selectorOpenedPopup);
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupSelector.removeEventListener("click", this._handleOverlayClose);
  }

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа
  // Модальное окно закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    this._closePopupButton.addEventListener("click", () => {
      this.close(); // TO DO - Тут происходит наслоение слушателей
    });
  }
}
