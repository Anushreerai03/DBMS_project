const Classroom = require("../models/classroom.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.Class_Number) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Classroom
  const classroom = new Classroom({
    Class_Number: req.body.Class_Number
  });

  // Save Classroom in the database
  Classroom.create(classroom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Classroom."
      });
    else res.send(data);
  });
};
