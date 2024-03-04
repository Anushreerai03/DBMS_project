const sql = require("./db.js");

const Classroom = function(classroom) {
  this.Class_Number = classroom.Class_Number;
};

Classroom.create = (newClassroom, result) => {
  sql.query("INSERT INTO Classroom SET ?", newClassroom, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created classroom: ", { id: res.insertId, ...newClassroom });
    result(null, { id: res.insertId, ...newClassroom });
  });
};

module.exports = Classroom;
