//create a group of functions to export that will validate a given resource. (POST)

module.exports = {
  
  


  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
     req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
     req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
   }
   const errors = req.validationErrors();
   if (errors) {
     req.flash("error", errors);
     return res.redirect(req.headers.referer);
   } else {
     return next();
   }
 },


  validateMeetings(req, res, next) {
    if(req.method === "POST") { //method used was POST
      req.checkBody("title", "must be at least 5 characters in length").isLength({min: 5});
      req.checkBody("description", "must be at least 10 characters in length").isLength({min: 10});
    }
//express "flash" module loads messages by using "req.flash"
    const errors = req.validationErrors();
    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateComments(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("body", "must not be empty"). notEmpty();
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next()
    }
  }

  


}