const meetingQueries = require("../db/queries.meetings");


module.exports = {

    index(req, res, next){
      meetingQueries.getAllMeetings((err, meetings) => {
        if(err){
          res.redirect(500, "static/index");
        } else{
          res.render("meetings/index", {meetings})
        }
      });
    },


    new(req, res, next){
      res.render("meetings/new");
      },

    create(req, res, next){
      let newMeeting = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
      };
      meetingQueries.addMeeting(newMeeting, (err, meeting) => {
        if(err){
        res.redirect(500, "/meetings/new");
        } else {
        res.redirect(303, `/meetings/${meeting.id}`);
        }
      });
    },


    show(req, res, next){
      meetingQueries.getMeeting(req.params.id, (err, meeting) => {
        if(err || meeting == null){
          res.redirect(404, "/")
        } else {
          res.render("meetings/show", {meeting});
        }
      });
    },

    destroy(req, res, next){
      meetingQueries.deleteMeeting(req.params.id, (err, meeting) => {
        if(err){
          res.redirect(500, `/meetings/${meeting.id}`)
        } else {
          res.redirect(303, "/meetings")
        }
      });
    },

    edit(req, res, next){
      meetingQueries.getMeeting(req.params.id, (err, meeting) => {
        if(err || meeting == null){
        res.redirect(404, "/");
        } else {
        res.render("meetings/edit", {meeting});
        }
      });
      },

      update(req, res, next){

             meetingQueries.updateMeeting(req.params.id, req.body, (err, meeting) => {
 
               if(err || meeting == null){
                 res.redirect(404, `/meetings/${req.params.id}/edit`);
               } else {
                 res.redirect(`/meetings/${meeting.id}`);
               }
             });
           }
  }