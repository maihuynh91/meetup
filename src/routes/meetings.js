const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const meetingController = require("../controllers/meetingController");
const validation = require("./validation");

router.get("/meetings", meetingController.index);
router.get("/meetings/new", meetingController.new);
router.post("/meetings/create", 
    helper.ensureAuthenticated,
    validation.validateMeetings,
    meetingController.create
    );
router.get("/meetings/:id", helper.ensureAuthenticated, meetingController.show);
router.post("/meetings/:id/destroy",  helper.ensureAuthenticated,meetingController.destroy);
router.get("/meetings/:id/edit", meetingController.edit);
router.post("/meetings/:id/update", meetingController.update);

module.exports = router;



