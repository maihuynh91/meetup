const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");


router.post("/meetings/:meetingId/comments/create",
  commentController.create);


router.post("/meetings/:meetingId/comments/:id/destroy",
  commentController.destroy);
 
module.exports = router;