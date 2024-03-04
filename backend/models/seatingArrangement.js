const sql = require("./db.js");

const SeatingArrangement = function(seatingArrangement) {
  this.seat_no = seatingArrangement.seat_no;
  this.Sid = seatingArrangement.Sid;
  this.CId = seatingArrangement.CId;
};

SeatingArrangement.create = (newSeatingArrangement, result) => {
  sql.query("INSERT INTO SeatingArrangement SET ?", newSeatingArrangement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created seating arrangement: ", { id: res.insertId, ...newSeatingArrangement });
    result(null, { id: res.insertId, ...newSeatingArrangement });
  });
};

module.exports = SeatingArrangement;
