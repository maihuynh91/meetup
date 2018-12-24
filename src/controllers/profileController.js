
const profileQueries = require("../db/queries.profiles");
const moment = require('moment');
module.exports = {

    index(req, res, next) {
        profileQueries.getProfile(req.user.id,(err, profile) => {
          if (err) {
            res.redirect(500, "static/index");
          } else {
            res.render("profiles/index", { profile,moment })
          }
        });
      },

}