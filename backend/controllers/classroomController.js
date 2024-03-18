const express = require("express");
const router = express.Router();
const db = require("../db");


router.post('/classrooms', (req, res) => {
  try {

    const { classNumber, capacity } = req.body
    console.log(req.body)

    db.query(
      "INSERT INTO classroom (class_number,capacity) VALUES(?,?)",
      [classNumber, capacity],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }
        console.log("class created successfully");
        return res.json({
          status: 201,
          success: true,
          message: result ,
        });
      }
    );

   
  } catch (error) {
    return res.status(500).json({
      messaage: "errror"
    })
  }
})



router.get('/classrooms', (req, res) => {
  db.query(
    "SELECT class_number, capacity FROM classroom",
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Error retrieving classrooms",
          error: error
        });
      }
      return res.status(201).json({
        success:true,
        data:results
      })
      console.log("Data retrieved successfully");
      return res.status(200).json(results);
    }
  );
});

router.delete('/classrooms/:classNumber', (req, res) => {
  try {
    const classNumber = req.params.classNumber;
    db.query(
      "DELETE FROM classroom WHERE class_number = ?",
      [classNumber],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }
        console.log("Classroom deleted successfully");
        return res.json({
          status: 200,
          success: true,
          message: "Classroom deleted successfully",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting classroom",
      error: error
    });
  }
});






module.exports = router;
