const express = require("express");
const router = express.Router();
const db = require("../db");
const { classNumber, capacity } = require("./classroomController");

router.post("/createfaculty", async (req, res) => {
  try {
    const { facultyId, facultyName, selectedClassroom } = req.body;


    const query = "INSERT INTO seating_arrangement.faculty (faculty_id, faculty_name, class_number) VALUES (?, ?, ?)";

    db.query(query, [facultyId, facultyName, selectedClassroom], (err, result) => {
      if (err) {
        console.error("Error creating benches:", err);
        res.status(500).send({ message: "An error occurred while creating the benches." });
        return;
      }
      console.log("Benches created successfully.");
      res.json({ id: result.insertId, facultyId, facultyName, selectedClassroom });
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

router.get('/class-number/:classNumberInput', (req, res) => {
  const classNumberInput = req.params.classNumberInput;

  // SQL query to retrieve class_number based on faculty_id or faculty_name
  const query = `
    SELECT class_number
    FROM faculty
    WHERE faculty_id = ? OR faculty_name = ?;
  `;

  // Execute the query
  db.query(query, [classNumberInput, classNumberInput], (err, results) => {
    if (err) {
      console.error('Error fetching details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if data is found
    if (results.length === 0) {
      res.status(404).json({ error: 'Data not found' });
      return;
    }

    // Extract class_number from the results
    const { class_number } = results[0];

    // Send the response with class_number
    res.json({ class_number });
  });
});


module.exports = router;
