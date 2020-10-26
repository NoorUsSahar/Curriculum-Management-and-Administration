const express = require("express");
const connectDB = require("./config/db");
//const cors = require('cors');
const app = express();

//connect database
connectDB();

//init middleware for faculty
app.use(express.json({ extended: false }));
//allow headers

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => res.send(`Api Running`));
//app.options('*', cors()) // include before other routes
//define routes
// app.use("/api/admin", require("./routes/api/auth"));
app.use("/api/faculty", require("./routes/api/faculty"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/calendar", require("./routes/api/calendarEvent"));
app.use('/api/survey', require('./routes/api/survey'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


