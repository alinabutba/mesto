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
    if (data.name) {
      this._userData.name.textContent = data.name;
    }    
    if (data.about) {
      this._userData.about.textContent = data.about;
    }    
    if (data.avatar) {
      this._userData.alt = `${data.name} avatar`;
      this.setUserAvatar(data);
    } 
  } 
 

  setUserAvatar(data) {
      this._userData.avatar.src = data.link;
    }
}