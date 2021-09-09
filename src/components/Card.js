export class Card {
  // Данные карточки
  _data;
  // Шаблон нашего темплейта в html
  _template;
  // Сюда мы положем структуру DOM-дерева из нашего темплейта
  // путем клонирования родителя и его детей
  _elementCard;
  // Это колбэк-функции, открытие картинки в popup,
  // она будет вызвана при клике на картинку карточки и отработает в index.js
  _handleCardClick;
  // Поиск элемента лайк в DOM
  _elementLike;
  // Поиск элемента картинки в DOM
  _elementImage;
  // Информация о текущем пользователе
  _ownerId;
  // Кнопка удаления карточки
  _activeDeleteBtn;
  // Колбэки лайков
  _handleDeletLike;
  _handleSetLike;
  // Массив под все лайки карточки
  _listLike = [];

  constructor(
    ownerId,
    data,
    cardData,
    { handleCardClick, handleCardClickDelete, handleSetLike, handleDeletLike }
  ) {
    this._ownerId = ownerId;
    this._data = data;
    this._template = cardData.cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardClickDelete = handleCardClickDelete;
    this._handleSetLike = handleSetLike;
    this._handleDeletLike = handleDeletLike;
  }

  // Клонируем узел и его детей
  _getElementCard() {
    return this._template.content.querySelector(".element").cloneNode(true);
  }

  // Установка заголовка
  _setDataCard(data) {
    this._elementCard.querySelector(".element__title").textContent = data.name;
    this._elementImage.alt = this._data.name;
    this._elementImage.src = this._data.link;
  }

  // Видимость элемента удалить карточку
  _setActiveElementDelete() {
    this._elementCard
      .querySelector(".element__delete")
      .classList.add("element__delete_active");
  }

  // Проверка, принадледит ли карточка пользователю
  _isOwnerCard() {
    return this._data.owner._id === this._ownerId;
  }

  // Удаляем созданный объект карточки
  deleteCard() {
    this._elementCard.remove();
    this._elementCard = null;
  }

  // Устанавливаем слушатели на нашу карточку
  _setEventListeners() {
    // открытие popup с картинкой
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });

    // Если карточка принадлежит пользователю, то отобразить и установить слушатель удаления карточки
    if (this._isOwnerCard()) {
      this._setActiveElementDelete();
      this._activeDeleteBtn =
        this._elementCard.querySelector(".element__delete");
      this._activeDeleteBtn.addEventListener("click", () => {
        this._handleCardClickDelete(this._data);
      });
    }

    // Установка слушателя на элемент лайк
    this._elementLike.addEventListener("click", () => {
      // Происходит проверка, есть ли уже element__like_active в класс листе element__like
      if (this._elementLike.classList.contains("element__like_active")) {
        this._handleDeletLike(this._data);
        // this.deleteLike(this._data);
      } else {
        this._handleSetLike(this._data);
        // this.setLike(this._data);
      }
    });
  }
  // Метод проверки наличия данного _id(лайка) в this._data.likes
  _checkIsLike(likeId) {
    this._listLike = this._data.likes.map((element) => {
      return element._id;
    });
    if (this._listLike.some((elem) => elem === likeId)) {
      return true;
    } else {
      return false;
    }
  }

  // Устанавливает количество лайков
  setCountLike(data) {
    this._elementCard.querySelector(".element__like-count").textContent =
      String(data.likes.length);
  }

  // Устанавливает лайки
  setLikes() {
    this._checkIsLike(this._ownerId)
      ? this.setLike(this._data)
      : this.deleteLike(this._data);
  }

  setLike(data) {
    this._addLikeActive();
    this.setCountLike(data);
  }
  deleteLike(data) {
    this._removeLikeActive();
    this.setCountLike(data);
  }
  // Активный лайк
  _addLikeActive() {
    this._elementLike.classList.add("element__like_active");
  }
  _removeLikeActive() {
    this._elementLike.classList.remove("element__like_active");
  }

  // Создать объект карточки
  getCard() {
    this._elementCard = this._getElementCard();
    this._elementLike = this._elementCard.querySelector(".element__like");
    this._elementImage = this._elementCard.querySelector(".element__image");
    this._setDataCard(this._data);
    this._setEventListeners();
    this.setLikes();
    return this._elementCard; // Возвращаем собранную карточку
  }
}
