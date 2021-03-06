const meetingQueries = require("../db/queries.meetings");
const Authorizer = require("../policies/meeting");
const moment = require('moment');
module.exports = {

  index(req, res, next) {
    meetingQueries.getAllMeetings((err, meetings) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("meetings/index", { meetings,moment })
      }
    });
  },


  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();
    if (authorized) {
      res.render("meetings/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/meetings");
    }
  },


  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    if (authorized) {
      let newMeeting = {
        title: req.body.title,
        body: req.body.body,
        description: req.body.description,
        date: req.body.date
      };
      meetingQueries.addMeeting(newMeeting, (err, meeting) => {
        if (err) {
          res.redirect(500, "/meetings/new");
        } else {
          res.redirect(303, `/meetings/${meeting.id}`);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/meetings");
    }
  },


  show(req, res, next) {
    const authorized = new Authorizer(req.user).show();
    if (authorized) {
      meetingQueries.getMeeting(req.params.id, (err, meeting) => {
        if (err || meeting == null) {
          res.redirect(404, "/")
        } else {
          let currentMeetingUser = meeting.meetingUsers.filter(meetingUser => req.user.id === meetingUser.userId)[0];
         
          res.render("meetings/show", { meeting,currentMeetingUser });
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/meetings");
    }

  },

  destroy(req, res, next) {
    meetingQueries.deleteMeeting(req, (err, meeting) => {
      if (err) {
        res.redirect(500, `/meetings/${req.params.id}`)
      } else {
        res.redirect(303, "/meetings")
      }
    });
  },

  edit(req, res, next) {
    meetingQueries.getMeeting(req.params.id, (err, meeting) => {
      if (err || meeting == null) {
        res.redirect(404, "/");
      }
      else {
        const authorized = new Authorizer(req.user, meeting).edit();
        if (authorized) {
          res.render("meetings/edit", { meeting });
        } else {
          req.flash("You are not authorized to do that.")
          res.redirect(`/meetings/${req.params.id}`)
        }
      }
    });
  },


  update(req, res, next) {

    meetingQueries.updateMeeting(req, req.body, (err, meeting) => {

      if (err || meeting == null) {
        res.redirect(401, `/meetings/${req.params.id}/edit`);
      } else {
        res.redirect(`/meetings/${req.params.id}`);
      }
    });
  }
}