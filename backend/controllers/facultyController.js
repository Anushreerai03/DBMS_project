const Faculty = require("../models/faculty.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.FId || !req.body.FName || !req.body.CId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create Faculty
  const faculty = new Faculty({
    FId: req.body.FId,
    FName: req.body.FName,
    CId: req.body.CId
  });

  // Save Faculty in the database
  Faculty.create(faculty, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Faculty."
      });
    else res.send(data);
  });
};
