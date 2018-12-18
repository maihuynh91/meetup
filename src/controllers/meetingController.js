const meetingQueries = require("../db/queries.meetings");

module.exports = {
    index(req, res, next){
      meetingQueries.getAllMeetings((err, meetings) => {
        if(err){
          console.log(err);
          res.redirect(500, "static/index");
        } else{
          res.render("meetings/index", {meetings})
        }
      });
    }
  }