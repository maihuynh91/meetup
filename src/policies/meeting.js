const ApplicationPolicy = require("./application");

module.exports = class MeetingPolicy extends ApplicationPolicy {

 // #2
  new() {
    return this._isAdmin();
  }

  create() {
    return this.new();
  }

 // #3
  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}