const Meeting = require("./models").Meeting;
const Comment = require("./models").Comment;
const User = require("./models").User;
const Authorizer = require("../policies/meeting");
const MeetingUser = require("./models").MeetingUser;

module.exports = {

  getAllMeetings(callback) {
    return Meeting.all()
      .then((meetings) => {
        callback(null, meetings);
      })
      .catch((err) => {
        callback(err);
      });
  },

  addMeeting(newMeeting, callback) {
    return Meeting.create({
      title: newMeeting.title,
      description: newMeeting.description,
      date: newMeeting.date
    })
      .then((meeting) => {
        callback(null, meeting);
      })
      .catch((err) => {
        callback(err);
      })
  },

  getMeeting(id, callback) {
    return Meeting.findById(id, {
      include: [{
        model: Comment, as: "comments", include: [
          { model: User }
        ]},
    { model: MeetingUser, as: "meetingUsers", include: [
      { model: User }
    ] }]
    })
      .then((meeting) => {
        callback(null, meeting);
      })
      .catch((err) => {
        callback(err);
      })
  },

  deleteMeeting(req, callback){
    return Meeting.findById(req.params.id)
    .then((meeting) => {

    const authorized = new Authorizer(req.user, meeting).destroy();  
    if(authorized) {
      meeting.destroy()
      .then((res) => {
        callback(null, meeting);
      });      
    } else {
      req.flash("notice", "You are not authorized to do that.")
      callback(401);
    }
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateMeeting(req, updatedMeeting, callback) {
    return Meeting.findById(req.params.id)
      .then((meeting) => {
        if (!meeting) {
          return callback("Meeting not found");
        }
        const authorized = new Authorizer(req.user, meeting).update();
        if(authorized){
          meeting.update(updatedMeeting, {
            fields: Object.keys(updatedMeeting)
          })
            .then(() => {
              callback(null, meeting);
            })
            .catch((err) => {
              callback(err);
            });
          } else {
            req.flash("notice", "You are not authorized to do that.");
            callback("Forbidden");
          }
        });
        }




}