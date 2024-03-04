const SeatingArrangement = require("../models/seatingArrangement.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.seat_no || !req.body.Sid || !req.body.CId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create Seating Arrangement
  const seatingArrangement = new SeatingArrangement({
    seat_no: req.body.seat_no,
    Sid: req.body.Sid,
    CId: req.body.CId
  });

  // Save Seating Arrangement in the database
  SeatingArrangement.create(seatingArrangement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Seating Arrangement."
      });
    else res.send(data);
  });
};
