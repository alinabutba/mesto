export default class Api {
  _token = null;
  _cohort = null;
  _baseUrl = null;
  _baseUserUrl = null;

  constructor(baseUrl, token, cohort) {
    this._token = token;
    this._cohort = cohort;
    this._baseUrl = baseUrl;
    this._baseUserUrl = this._baseUrl + this._cohort + "/";
  }

  // TO DO Оптимизация, тернарные выражения???

  // Тут происходит обработка responce
  _handlerResponse(responce) {
    if (responce.ok) {
      console.log(
        `Response OK-> (${responce.status}) - ${responce.statusText}`
      );
      return responce.json();
    } else {
      console.log(
        `Bad responce -| Ошибка номер: (${responce.status}) - ${responce.statusText}`
      );
      return Promise.reject(
        `Ошибка номер (${responce.status}) - ${responce.statusText}`
      );
    }
  }

  // 1. Загрузка информации о пользователе с сервера
  //GET https://nomoreparties.co/v1/cohortId/users/me
  getUser() {
    return fetch(`${this._baseUserUrl}users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handlerResponse);
  }
  // 2. Загрузка карточек с сервера
  getCards() {
    return fetch(`${this._baseUserUrl}cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handlerResponse);
  }
  // 3. Редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._baseUserUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handlerResponse);
  }
  // 4. Добавление новой карточки
  setNewCard(data) {
    return fetch(`${this._baseUserUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handlerResponse);
  }
  // 7. Удаление карточки
  deleteCard(data) {
    console.log(`DELETING DATA:${data}`);
    return fetch(`${this._baseUserUrl}cards/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handlerResponse);
  }
  // 8. Постановка и снятие лайка
  //Чтобы лайкнуть карточку, отправьте PUT-запрос:
  //PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId
  //*
  //Чтобы убрать лайк, нужно отправить DELETE-запрос с тем же URL:
  //DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId
  setLike(data) {
    return fetch(`${this._baseUserUrl}cards/likes/${data._id}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handlerResponse);
  }
  deleteLike(data) {
    return fetch(`${this._baseUserUrl}cards/likes/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handlerResponse);
  }
  // 9. Обновление аватара пользователя
  //Чтобы сменить аватар, отправьте такой PATCH-запрос:
  //PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar
  setUserAvatar(data) {
    return fetch(`${this._baseUserUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handlerResponse);
  }
}
