export class Card {
  // Данные из карточки (хранит в себе два ключа - name, link)
  _data;

  // Шаблон нашего темплейта в html
  _template;

  // Сюда мы положем структуру DOM-дерева из нашего темплейта
  // путем клонирования родителя и его детей
  _elementCard;

  // Это колбэк-функции, открытие картинки в popup,
  // она будет вызвана при клике на картинку карточки и отработает в index.js
  _callbackPopup;

  constructor(data, template, callbackPopup) {
    this._data = data;
    this._template = template;
    this._callbackPopup = callbackPopup;
  }

  // Клонируем узел и его детей
  _getElementCard() {
    return this._template.content.querySelector(".element").cloneNode(true);
  }

  // Переключение лайка у карточки
  _isLike() {
    this._elementCard
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  // Устанавливаем слушатели на нашу карточку
  _setEventListeners() {
    // лайк
    this._elementCard
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._isLike();
      });

    // удаление карточки
    this._elementCard
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this.deleteCard();
      });

    // открытие popup с картинкой
    this._elementCard
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._callbackPopup(this._data);
      });
  }

  // Удаляем созданный объект карточки
  deleteCard() {
    this._elementCard.remove();
    this._elementCard = null;
  }

  // Создать объект карточки
  getCard() {
    this._elementCard = this._getElementCard();
    this._setEventListeners();

    this._elementCard.querySelector(".element__title").textContent =
      this._data.name;
    this._elementCard.querySelector(".element__image").alt = this._data.name;
    this._elementCard.querySelector(".element__image").src = this._data.link;

    return this._elementCard;
  }
}