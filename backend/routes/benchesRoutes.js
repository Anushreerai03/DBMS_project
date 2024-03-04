const express = require("express");
const router = express.Router();
const benchesController = require("../controllers/benchesController.js");

// Create Benches
router.post("/", benchesController.create);

module.exports = router;
