const meetingUserQueries = require("../db/queries.meetingUsers");
const Authorizer = require("../policies/meetingUser.js");

module.exports = {

    create(req, res, next){
        const authorized = new Authorizer(req.user).create();

        if(authorized){
            let newMeetingUser = {
                userId:req.user.id,
                meetingId:req.params.meetingId
            };
            meetingUserQueries.createMeetingUser(newMeetingUser, (err, result) => {
                if(err){
                    req.flash("error", err);
                }
                res.redirect(req.headers.referer);
                
            });
        } else {
            req.flash("notice", "You must be signed in to do that.")
            req.redirect("/users/sign_in");
            }
    },
    

    destroy(req, res, next){
        meetingUserQueries.deleteMeetingUser(req, (err, meetingUser) => {
          if(err){
            res.redirect(err, req.headers.referer);
          } else {
            res.redirect(req.headers.referer);
          }
        });
      }
    

    
}