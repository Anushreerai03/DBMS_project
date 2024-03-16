
const express = require("express");
const router = express.Router();
const db = require("../db");
router.post('/arrangements', (req, res) => {
    const { classroomNumber, rightRow, middleRow, leftRow } = req.body;

    console.log(classroomNumber)
    // Insert seating arrangements into the database
    const query = `
        INSERT INTO SeatingArrangements (class_number, row_position, from_student_id, to_student_id)
        VALUES (?, ?, ?, ?)
    `;

    // Insert seating arrangements for the right row
    db.query(query, [classroomNumber, 'right', rightRow.from, rightRow.to], (err, results) => {
        if (err) {
            console.error('Error inserting seating arrangements for the right row:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Seating arrangements for the right row inserted successfully');
    });

    // Insert seating arrangements for the middle row
    db.query(query, [classroomNumber, 'middle', middleRow.from, middleRow.to], (err, results) => {
        if (err) {
            console.error('Error inserting seating arrangements for the middle row:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Seating arrangements for the middle row inserted successfully');
    });

    // Insert seating arrangements for the left row
    db.query(query, [classroomNumber, 'left', leftRow.from, leftRow.to], (err, results) => {
        if (err) {
            console.error('Error inserting seating arrangements for the left row:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Seating arrangements for the left row inserted successfully');

        // Send response indicating success
        res.status(200).json({ message: 'Seating arrangements inserted successfully' });
    });
});


// Add more routes and middleware as needed

router.get('/seating-details/:usn', (req, res) => {
    const usn = req.params.usn;

    // SQL query to retrieve class_number and row_position based on USN
    const query = `
    SELECT sa.class_number, sa.row_position
    FROM seatingarrangements sa
    JOIN student s ON (sa.from_student_id <= s.s_id AND sa.to_student_id >= s.s_id)
    WHERE s.USN = ?
    `;

    // Execute the query
    db.query(query, [usn], (err, results) => {
        if (err) {
            console.error('Error fetching seating details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Check if data is found
        if (results.length === 0) {
            res.status(404).json({ error: 'USN not found' });
            return;
        }

        // Extract class_number and row_position from the results
        const { class_number, row_position } = results[0];

        // Send the response with class_number and row_position
        res.json({ class_number, row_position });
    });
});

module.exports = router;
