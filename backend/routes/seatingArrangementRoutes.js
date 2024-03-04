const express = require("express");
const router = express.Router();
const seatingArrangementController = require("../controllers/seatingArrangementController.js");

// Create Seating Arrangement
router.post("/", seatingArrangementController.create);

module.exports = router;
