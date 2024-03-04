const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController.js");

// Create Faculty
router.post("/", facultyController.create);

module.exports = router;
