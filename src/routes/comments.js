const express = require("express");
const router = express.Router();

 //#1
const commentController = require("../controllers/commentController");


 // #2
router.post("/meetings/:meetingId/comments/create",
  commentController.create);

 // #3
router.post("/meetings/:meetingId/comments/:id/destroy",
  commentController.destroy);
  
module.exports = router;