const express = require("express");
const router = express.Router();
const db = require("../db");

// Model
// const Faculty = function(faculty) {
//   this.FId = faculty.FId;
//   this.FName = faculty.FName;
//   this.CId = faculty.CId;
// };

// Faculty.create = (newFaculty, result) => {
//   db.query("INSERT INTO Faculty SET ?", newFaculty, (err, res) => {
//     if (err) {
//       console.error("Error creating faculty:", err);
//       result(err, null);
//       return;
//     }

//     console.log("Created faculty:", { id: res.insertId, ...newFaculty });
//     result(null, { id: res.insertId, ...newFaculty });
//   });
// };

// // Controller

// // Create Faculty
// router.post("/", (req, res) => {
//   // Validate request
//   if (!req.body.FId || !req.body.FName || !req.body.CId) {
//     res.status(400).send({ message: "Content cannot be empty!" });
//     return;
//   }

//   // Create Faculty
//   const faculty = new Faculty({
//     FId: req.body.FId,
//     FName: req.body.FName,
//     CId: req.body.CId
//   });

//   // Save Faculty in the database
//   Faculty.create(faculty, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the Faculty."
//       });
//     else res.send(data);
//   });
// });





router.get('/getclassNumbers',(req,res)=>{
  try {
    db.query(
      "SELECT class_number FROM classroom",
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            status: 500,
            success: false,
            message: error,
          });
        }
        console.log("Data retrieved successfully");
        return res.status(200).json(result.map(item => item.class_number));
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
})

module.exports = router;
