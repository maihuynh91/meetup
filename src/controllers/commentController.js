const commentQueries = require("../db/queries.comments.js");
const Authorizer = require("../policies/comment.js");

module.exports = {

  create(req, res, next){
 // #2
    const authorized =true /* new Authorizer(req.user).create(); */

    if(authorized) {

      let newComment = {
        body: req.body.body,
        userId: req.user.id,
        meetingId: req.params.meetingId
      };

 
      commentQueries.createComment(newComment, (err, comment) => {
 // #5
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

// #6
  destroy(req, res, next){
    commentQueries.deleteComment(req, (err, comment) => {
      if(err){
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
}