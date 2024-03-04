const Benches = require("../models/benches.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.Left || !req.body.Center || !req.body.Right || !req.body.CId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create Benches
  const benches = new Benches({
    Left: req.body.Left,
    Center: req.body.Center,
    Right: req.body.Right,
    CId: req.body.CId
  });

  // Save Benches in the database
  Benches.create(benches, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Benches."
      });
    else res.send(data);
  });
};
