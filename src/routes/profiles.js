const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const profileController = require("../controllers/profileController");
const validation = require("./validation");

router.get("/profiles",  helper.ensureAuthenticated, profileController.index);

/* router.get("/profiles/:id", helper.ensureAuthenticated, profileController.show); */

module.exports = router;



