const express = require("express");
const settingsController = require("../server/controllers/settingsController");

// get an instance of express router, then redirect to correct controller
const router = express.Router();

router
  .route("/base/:id/:name/:total_children/:ratio")
  .put(settingsController.editBaseSettings);

module.exports = router;
