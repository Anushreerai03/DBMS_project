const sql = require("./db.js");

const Benches = function(benches) {
  this.Left = benches.Left;
  this.Center = benches.Center;
  this.Right = benches.Right;
  this.CId = benches.CId;
};

Benches.create = (newBenches, result) => {
  sql.query("INSERT INTO Benches SET ?", newBenches, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created benches: ", { id: res.insertId, ...newBenches });
    result(null, { id: res.insertId, ...newBenches });
  });
};

module.exports = Benches;
