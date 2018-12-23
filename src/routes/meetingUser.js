const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const meetingUserController = require("../controllers/meetingUserController");


router.post("/meetings/:meetingId/meetingUser/create", 
    helper.ensureAuthenticated,
    meetingUserController.create
        );

router.post("/meetings/:meetingId/meetingUser/:id/destroy", 
    helper.ensureAuthenticated, 
    meetingUserController.destroy
    );

 
module.exports = router;