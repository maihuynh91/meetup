const User = require("./models").User;
const MeetingUser = require("./models").MeetingUser
const Meeting = require("./models").Meeting
module.exports = {

  getProfile(id, callback) {
    return User.findById(id, {
      include: [{
        model: MeetingUser, as: "meetingUsers", include: [
          { model: Meeting }
        ]
      }]
    })
      .then((profile) => {
        callback(null, profile);
      })
      .catch((err) => {
        callback(err);
      })
  }

}