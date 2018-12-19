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

  deleteMeeting(req, callback){

    // #1
        return Meeting.findById(req.params.id)
        .then((meeting) => {
   
    // #2
          const authorized = new Authorizer(req.user, meeting).destroy();
   
          if(authorized) {
    // #3
            meeting.destroy()
            .then((res) => {
              callback(null, meeting);
            });
            
          } else {
   
    // #4
            req.flash("notice", "You are not authorized to do that.")
            callback(401);
          }
        })
        .catch((err) => {
          callback(err);
        });
      },
      

      updateMeeting(req, updatedMeeting, callback){

        // #1
             return Meeting.findById(req.params.id)
             .then((meeting) => {
        
        // #2
               if(!meeting){
                 return callback("Meeting not found");
               }
        
        // #3
               const authorized = new Authorizer(req.user, meeting).update();
        
               if(authorized) {
        
        // #4
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
        
        // #5
                 req.flash("notice", "You are not authorized to do that.");
                 callback("Forbidden");
               }
             });
           }


}