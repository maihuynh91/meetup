const discussionQueries = require("../db/queries.discussions.js");
const Authorizer = require("../policies/application.js");

module.exports = {

  create(req, res, next){
       const authorized = new Authorizer(req.user).create();
   
       if(authorized) {
         let newDiscussion = {
           body: req.body.body,
           userId: req.user.id,
           postId: req.params.postId
         };
 
         discussionQueries.createDiscussion(newDiscussion, (err, discussion) => {
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
    discussionQueries.deleteDiscussion(req, (err, discussion) => {
      if(err){
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
}