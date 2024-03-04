const sql = require("./db.js");

const Faculty = function(faculty) {
  this.FId = faculty.FId;
  this.FName = faculty.FName;
  this.CId = faculty.CId;
};

Faculty.create = (newFaculty, result) => {
  sql.query("INSERT INTO Faculty SET ?", newFaculty, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created faculty: ", { id: res.insertId, ...newFaculty });
    result(null, { id: res.insertId, ...newFaculty });
  });
};

module.exports = Faculty;
