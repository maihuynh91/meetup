const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/meetingController");

router.get("/topics", meetingController.index);

module.exports = router;