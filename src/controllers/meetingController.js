const meetingQueries = require("../db/queries.meetings");
const Authorizer = require("../policies/meeting");

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
    },


    new(req, res, next){
      const authorized = new Authorizer(req.user).new();
  
      if(authorized) {
        res.render("meetings/new");
      } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/meetings");
      }
        },

    create(req, res, next){

      const authorized = new Authorizer(req.user).create();
  
      if(authorized) {
        let newMeeting = {
          title: req.body.title,
          description: req.body.description
        };
        meetingQueries.addMeeting(newMeeting, (err, meeting) => {
          if(err){
            res.redirect(500, "meetings/new");
          } else {
            res.redirect(303, `/meetings/${meeting.id}`);
          }
        });
      } else {

        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/meetings");
      }
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

      // #1
          meetingQueries.deleteMeeting(req, (err, meeting) => {
            if(err){
              res.redirect(err, `/meetings/${req.params.id}`)
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
  
              const authorized = new Authorizer(req.user, meeting).edit();
 
              if(authorized){
                res.render("meetings/edit", {meeting});
              } else {
                req.flash("You are not authorized to do that.")
                res.redirect(`/meetings/${req.params.id}`)
              }
            }
          });
        },

        update(req, res, next){

          // #1
              meetingQueries.updateMeeting(req, req.body, (err, meeting) => {
                if(err || meeting == null){
                  res.redirect(401, `/meetings/${req.params.id}/edit`);
                } else {
                  res.redirect(`/meetings/${req.params.id}`);
                }
              });
            }
         
  }