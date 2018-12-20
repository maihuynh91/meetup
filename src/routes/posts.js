const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController")
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/meetings/:meetingId/posts/new", postController.new);

router.post("/meetings/:meetingId/posts/create",
   helper.ensureAuthenticated,
   validation.validatePosts,
   postController.create);

router.get("/meetings/:meetingId/posts/:id", postController.show);
router.get("/meetings/:meetingId/posts/:id/edit", postController.edit);
router.post("/meetings/:meetingId/posts/:id/update", validation.validatePosts, postController.update);
router.post("/meetings/:meetingId/posts/:id/destroy",postController.destroy)

module.exports = router;