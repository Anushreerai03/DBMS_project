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





module.exports = router;
