const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController.js");

// Create a new Classroom
router.post("/", classroomController.create);

module.exports = router;
