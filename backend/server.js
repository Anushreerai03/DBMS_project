const express = require("express");
const benchesController  = require("./controllers/benchesController")
const classroomController = require("./controllers/classroomController")
const seatingArrangementController = require("./controllers/seatingArrangementController")


// const bodyParser = require("body-parser");
const cors = require("cors");
//const { default: SeatingArrangementForm } = require("../frontend/src/components/SeatingArrangementForm");
// const classroomRoutes = require("./routes/classroomRoutes.js");

const app = express();

app.use(express.json())

// Middleware
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use("/api/classrooms", classroomRoutes);

// Port
app.use('/api/seating',seatingArrangementController)
app.use('/api/benches',benchesController)
app.use('/api/classroom',classroomController)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
