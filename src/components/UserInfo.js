export default class UserInfo {
  _userData = {};

  constructor({ name, job }) {
    this._userData = { name: name, job: job };
  }

  getUserInfo() {
    return {
      name: this._userData.name.textContent,
      job: this._userData.job.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._userData.name.textContent = name;
    this._userData.job.textContent = job;
  }
}
