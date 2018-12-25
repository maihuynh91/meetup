
const MeetingUser = require("./models").MeetingUser;
const Authorizer = require("../policies/meetinguser");
const Meeting = require("./models").Meeting;

module.exports = {

    createMeetingUser(newMeetingUser, callback){
        return MeetingUser.findAll({
            where: {
              userId:newMeetingUser.userId,
              meetingId:newMeetingUser.meetingId
            }
          }).then(meetingUsers=>{
              if(meetingUsers && meetingUsers.length>0){
                callback(null,null);
              }else{
                MeetingUser.create(newMeetingUser)
                .then((meetingUser) => {
                    callback(null, meetingUser);
                })
                .catch((err) => {
                    callback(err);
                })
              }});
          }    
    ,

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