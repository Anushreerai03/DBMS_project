const express = require("express");
const router = express.Router();
const db = require("../db");
const { classNumber, capacity } = require("./classroomController");

// Create Benches
router.post("/createbenches", (req, res) => {
  // Validate request
 
  // if (!req.body.Left || !req.body.Center || !req.body.Right || !req.body.x) {
  //   res.status(400).send({ message: "Content cannot be empty!" });
  
  try{

  // console.log("Hello")

  // Create Benches
  const { Left, Center, Right, CId } = req.body;
  const query = "INSERT INTO seating_arrangement.benches (left_bench, right_row, middle_row, c_id) VALUES (?, ?, ?, ?)";

  db.query(query, [Left, Center, Right, CId], (err, result) => {
    if (err) {
      console.error("Error creating benches:", err);
      res.status(500).send({ message: "An error occurred while creating the benches." });
      return;
    }
    console.log("Benches created successfully.");
    res.json({ id: result.insertId, Left, Center, Right, CId });
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
