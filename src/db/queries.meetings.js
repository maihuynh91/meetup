const Meeting = require("./models").Meeting;
const Post = require("./models").Post;

module.exports = {

  getAllMeetings(callback){
    return Meeting.all()

    .then((meetings) => {
      callback(null, meetings);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addMeeting(newMeeting, callback){
    return Meeting.create({
      title: newMeeting.title,
      description: newMeeting.description,
      host: newMeeting.host
    })
    .then((meeting) => {
      callback(null, meeting);
    })
    .catch((err) => {
      callback(err);
    })
  },


  getMeeting(id, callback){
    return Meeting.findById(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((meeting) => {
      callback(null, meeting)
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteMeeting(id, callback){
    return Meeting.destroy({
      where: {id}
    })
    .then((meeting) => {
      callback(null, meeting);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateMeeting(id, updatedMeeting, callback){
    return Meeting.findById(id)
    .then((meeting) => {
      if(!meeting){
        return callback("Meeting not found");
      }

      meeting.update(updatedMeeting, {
        fields: Object.keys(updatedMeeting)
      })
      .then(() => {
        callback(null, meeting);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }



}