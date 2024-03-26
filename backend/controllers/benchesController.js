const express = require("express");
const router = express.Router();
const db = require("../db");
const { classNumber, capacity } = require("./classroomController");

// Create Benches
router.post("/createbenches", (req, res) => {
  try{
  // Create Benches
  const { left, center, right, selectedClassroom } = req.body;
  
  const query = "INSERT INTO seating_arrangement.benches (left_bench, right_row, middle_row, class_number) VALUES (?, ?, ?, ?)";

  db.query(query, [left, center, right, selectedClassroom], (err, result) => {
    if (err) {
      console.error("Error creating benches:", err);
      res.status(500).send({ message: "An error occurred while creating the benches." });
      return;
    }
    console.log("Benches created successfully.");
    res.json({ id: result.insertId, left, center, right, selectedClassroom });
  });

 } catch (error) {
  return res.status(500).json({
    messaage: "error"
  })
}
});


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
