const express = require("express");
const router = express.Router();
const db = require("../db");
const { classNumber, capacity } = require("./classroomController");

// Create Benches
router.post("/createbenches", (req, res) => {
  // Validate request
 try{
  if (!req.body.Left || !req.body.Center || !req.body.Right || !req.body.CId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create Benches
  const { Left, Center, Right, CId } = req.body;
  const query = "INSERT INTO Benches (Left, Center, Right, CId) VALUES (?, ?, ?, ?)";

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
    messaage: "errror"
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
        return res.status(200).json({
          status: 200,
          success: true,
          message: result,
        });
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
