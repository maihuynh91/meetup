const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/meetings/:meetingId/posts/new", postController.new);
router.post("/meetings/:meetingId/posts/create", postController.create);
router.get("/meetings/:meetingId/posts/:id", postController.show);
router.post("/meetings/:meetingId/posts/:id/destroy", postController.destroy);
router.get("/meetings/:meetingId/posts/:id/edit", postController.edit);
router.post("/meetings/:meetingId/posts/:id/update", postController.update);

module.exports = router;