const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const faker = require("faker");

module.exports = {

    signUp(req, res, next){
      res.render("users/sign_up");
    },

    create(req, res, next){
    
      let newUser = {
        image: faker.image.avatar(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      };

      userQueries.createUser(newUser, (err, user) => {
        if(err){
          req.flash("notice", "This email is already registered.");
          res.redirect("/users/sign_up");
        } else {

          passport.authenticate("local")(req, res, () => {
            req.flash("notice", "You've successfully signed up to Meetup!");
            res.redirect("/about");
          })
             }
           });
         },


    signInForm(req, res, next){
      res.render("users/sign_in");
        },


    signIn(req, res, next){
      passport.authenticate("local")(req, res, function () {
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/meetings");
        }
      })
    },

    signOut(req, res, next){
      req.logout();
      req.flash("notice", "You've successfully signed out!");
      res.redirect("/");
    },


    show(req, res, next) {
      userQueries.getUser(req.params.id, (err, user) => {
        if(err || user === undefined){
          req.flash("notice", "No user found with that ID.");
          res.redirect("/");
        } else {
          res.render("users/show", {user});
        }
      });
    },
    
  }