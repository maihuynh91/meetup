const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const commentController = require("../controllers/commentController");
const validation = require("./validation")

router.post("/meetings/:meetingId/comments/create",
    helper.ensureAuthenticated,
    validation.validateComments,
    commentController.create
  );


router.post("/meetings/:meetingId/comments/:id/destroy",
    helper.ensureAuthenticated,
    // validation.validateComments,
    commentController.destroy
  );
 
module.exports = router;