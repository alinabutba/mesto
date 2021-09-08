export default class UserInfo {
  _userData = {};

  constructor(userData) {
    this._userData = userData;
  }

  getUserInfo() {
    return {
      name: this._userData.name.textContent,
      about: this._userData.about.textContent,
    };
  }

  setUserInfo(data) {
    this._userData.name.textContent = data.name;
    this._userData.about.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userData.avatar.src = data.link;
  }
}
