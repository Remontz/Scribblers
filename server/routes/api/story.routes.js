const express = require("express");
const router = express.Router();
const {
  createStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
} = require("../../controllers/story.controller.js");

router
  .route("/")
  .get(getStories)
  .post(createStory)
  .put(updateStory)
  .delete(deleteStory);
router.route("/:id").get(getStory);

module.exports = router;
