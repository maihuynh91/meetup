const Discussion = require("./models").Discussion;
const Post = require("./models").Post;
const User = require("./models").User;

const Authorizer = require("../policies/meeting");

module.exports = {

 
  createDiscussion(newDiscussion, callback){
    return Discussion.create(newDiscussion)
    .then((discussion) => {
      callback(null, discussion);
    })
    .catch((err) => {
      callback(err);
    });
  },


  deleteDiscussion(req, callback){
    return Discussion.findById(req.params.id)
    .then((discussion) => {
      const authorized = new Authorizer(req.user, discussion).destroy();

      if(authorized){
        discussion.destroy();
        callback(null, discussion)
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401)
      }
    })
  }

}