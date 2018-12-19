const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/meetingController");

router.get("/meetings", meetingController.index);
router.get("/meetings/new", meetingController.new);
router.post("/meetings/create", meetingController.create);
router.get("/meetings/:id", meetingController.show);
router.post("/meetings/:id/destroy", meetingController.destroy);
router.get("/meetings/:id/edit", meetingController.edit);
router.post("/meetings/:id/update", meetingController.update);

module.exports = router;
