
const MeetingUser = require("./models").MeetingUser;
const Authorizer = require("../policies/meetingUser");

module.exports = {

    createMeetingUser(newMeetingUser, callback){
        return MeetingUser.create(newMeetingUser)
        .then((meetingUser) => {
            callback(null, meetingUser);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteMeetingUser(req, callback){
        return MeetingUser.findById(req.params.id)
        .then((meetingUser) => {
          const authorized = new Authorizer(req.user, meetingUser).destroy();
         if(authorized){
            meetingUser.destroy();
            callback(null, meetingUser)
          }
           else {
            req.flash("notice", "You are not authorized to do that.")
            callback(401)
          }
       })
      }
    

}