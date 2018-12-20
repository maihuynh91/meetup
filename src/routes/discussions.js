const express = require("express");
const router = express.Router();

 //#1
const discussionController = require("../controllers/discussionController");
const validation = require("./validation");

 // #2
router.post("/meetings/:meetingId/posts/:postId/discussions/create",
  validation.validateDiscussions,
  discussionController.create);

 // #3
router.post("/meetings/:meetingId/posts/:postId/discussions/:id/destroy",
  discussionController.destroy);

module.exports = router;